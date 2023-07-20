import MainLayout from "../../layouts/main/MainLayout.tsx";
import {useDeleteUserMutation, useGetUsersQuery} from "../../store/api/usersApi.ts";
import Table from "../../components/Table/Table.tsx";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import {User} from "../../types/Models/User/model.ts";
import {useTable} from "../../hooks/table/useTable.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import styles from './UsersPage.module.scss';
import useSort from "../../hooks/table/useSort.ts";
import {usePagination} from "../../hooks/table/usePagination.ts";
import Input from "../../components/Form/Input/Input.tsx";
import useFilters from "../../hooks/table/useFilters.ts";
import TableFilters from "../../components/Table/TableFilters/TableFilters.tsx";
import {Role} from "../../types/Models/Role/model.ts";
import RolesSelect from "../../components/Form/Selects/RolesSelect/RolesSelect.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import parseDate from "../../utils/dateHelper.ts";
import {useSelector} from "react-redux";
import {RootStore} from "../../store/store.ts";
import {toast} from "react-toastify";

type TFilter = {
    name: string,
    email: string,
    role: number,
    search: string
}

const UsersPage = () => {
    const navigate = useNavigate();
    const {createHeaders, createConfig} = useTable<User>()
    const {currentSort, defaultTableSort} = useSort<User>({field: 'id', direction: 'desc'});
    const {currentPage, perPage, changePage, nextPage, prevPage, changePerPage} = usePagination(1, 10);
    const {register, onFiltersSubmit, filters, onFiltersReset} = useFilters<TFilter>(changePage);
    const currentUser = useSelector((state: RootStore) => state.auth.user);

    const {data, isSuccess} = useGetUsersQuery({
        sort: currentSort,
        page: currentPage,
        filters: filters,
        perPage: perPage
    });
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        if (currentUser?.id === id) {
            toast.error('You can\'t delete yourself');
            return;
        }
        await deleteUser(id);
    }


    const headers = createHeaders([
        {
            name: "id",
            field: 'id',
            selector: (row) => row.id,
            tableSort: (field) => {
                defaultTableSort(field);
            },
        },
        {
            name: "Name",
            field: 'name',
            selector: (row) => row.name,
            tableSort: (field) => {
                defaultTableSort(field);
            },
        },
        {
            name: "Email",
            field: 'email',
            selector: (row) => row.email,
            tableSort: (field) => {
                defaultTableSort(field);
            },
        },
        {
            name: "Roles",
            selector: (row) => {
                const roles = row.roles as Role[]
                return (
                    <div>
                        {roles.map((role) => {
                            return <div key={role.id}>{role.name}</div>
                        })}
                    </div>
                )
            }
        },
        {
            name: "Created at",
            selector: (row) => parseDate(row.created_at as string),
        },
        {
            name: 'Actions',
            selector: (row) => {
                return (
                    <div className="tableActions">
                        <Button onClick={() => navigate(`/users/${row.id}`)} type="button">Show</Button>
                        <Button onClick={() => navigate(`/users/${row.id}/edit`)} type="button">Edit</Button>
                        <Button onClick={() => handleDelete(Number(row.id))} type="button">Delete</Button>
                    </div>
                )
            }
        }
    ]);

    const config =  createConfig({
        currentSort: currentSort,
    });

    if (!isSuccess) {
        return (
            <MainLayout>
                <Loader mainLayout />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1>Users</h1>
                        <TableFilters onFiltersReset={onFiltersReset} onFiltersSubmit={onFiltersSubmit}>
                            <Input placeholder="Name" type="text" register={register('name')} />
                            <Input placeholder="Email" type="text" register={register('email')} />
                            <RolesSelect<TFilter> name='role' register={register} />
                        </TableFilters>
                    </div>
                    <div className={styles.headerRight}>
                        <Button onClick={() => navigate('/users/create')} type="button">Create user</Button>
                    </div>

                </div>

                <Table<User>
                    config={config}
                    headers={headers}
                    data={data.data}
                />
                <Pagination
                    className={styles.pagination}
                    page={currentPage}
                    lastPage={data.meta.last_page}
                    perPage={perPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    changePerPage={changePerPage}
                />
            </div>
        </MainLayout>
    )
}

export default UsersPage;