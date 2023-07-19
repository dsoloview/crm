import MainLayout from "../../layouts/main/MainLayout.tsx";
import {useGetUsersQuery} from "../../store/api/usersApi.ts";
import Table from "../../components/Table/Table.tsx";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import {User} from "../../types/Models/User/model.ts";
import {useTable} from "../../hooks/table/useTable.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import styles from './UsersPage.module.scss';
import useSort from "../../hooks/table/useSort.ts";
import {usePagination} from "../../hooks/table/usePagination.ts";
import Input from "../../components/Input/Input.tsx";
import useFilters from "../../hooks/table/useFilters.ts";
import Select from "../../components/Form/Select/Select.tsx";
import TableFilters from "../../components/Table/TableFilters/TableFilters.tsx";
import {useGetRolesQuery} from "../../store/api/rolesApi.ts";
import {ReactNode} from "react";
import {Role} from "../../types/Models/Role/model.ts";

type TFilter = {
    name: string,
    email: string,
    role: number,
    search: string
}
const UsersPage = () => {
    const navigate = useNavigate();
    const {createHeaders, createConfig} = useTable<User>()
    const {currentSort, defaultTableSort} = useSort<User>({field: 'id', direction: 'asc'});
    const {currentPage, perPage, changePage, nextPage, prevPage, changePerPage} = usePagination(1, 10);
    const {register, onFiltersSubmit, filters, onFiltersReset} = useFilters<TFilter>(changePage);

    const {data, isSuccess} = useGetUsersQuery({
        sort: currentSort,
        page: currentPage,
        filters: filters,
        perPage: perPage
    });

    const {data: roles, isSuccess: isRolesSuccess} = useGetRolesQuery();
    let renderedRolesOptions: ReactNode = [];
    if (isRolesSuccess) {
        renderedRolesOptions = roles.data.map((role) => {
            return (
                <option key={role.id} value={role.id}>{role.name}</option>
            )
        });
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
            name: "Show",
            selector: (row) => {
                return (
                    <Button onClick={() => navigate(`/users/${row.id}`)} type="button">Show</Button>
                )
            },
        },
        {
            name: "Edit",
            selector: (row) => {
                return (
                    <Button onClick={() => navigate(`/users/${row.id}/edit`)} type="button">Edit</Button>
                )
            },
        },
    ]);

    const config =  createConfig({
        currentSort: currentSort,
    });

    if (!isSuccess) {
        return (
            <MainLayout>
                <div>Loading...</div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Users</h1>
                <TableFilters onFiltersReset={onFiltersReset} onFiltersSubmit={onFiltersSubmit}>
                    <Input placeholder="Name" type="text" register={register('name')} />
                    <Input placeholder="Email" type="text" register={register('email')} />
                    <Select register={register('role')}>
                        <option value="">Role</option>
                        {renderedRolesOptions}
                    </Select>
                </TableFilters>
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