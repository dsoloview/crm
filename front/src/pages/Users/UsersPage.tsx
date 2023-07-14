import MainLayout from "../../layouts/main/MainLayout.tsx";
import {useGetUsersQuery} from "../../store/api/usersApi.ts";
import Table from "../../components/Table/Table.tsx";
import {TTableHeader, TTableConfig} from "../../types/Table/table.types.ts";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import {User} from "../../types/User/model.ts";
import {useTable} from "../../hooks/useTable.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";

const UsersPage = () => {
    const {
        sort: {currentSort, defaultTableSort},
        pagination: {currentPage, perPage, nextPage, prevPage, changePerPage}
    } = useTable<User>({
        sort: {
            defaultSort: {
                field: 'id',
                direction: 'asc'
            }
        },
        pagination: {
            page: 1,
            perPage: 10,
        }
    })
    const {data, isSuccess} = useGetUsersQuery({
        sort: currentSort,
        page: currentPage,
        perPage: perPage
    });
    const navigate = useNavigate();

    const headers: TTableHeader<User>[] = [
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
        },
        {
            name: "Test",
            selector: () => 'HELLO',
        },
        {
            name: "Edit",
            selector: (row) => {
                return (
                    <Button onClick={() => navigate(`/users/${row.id}/edit`)} type="button">Edit</Button>
                )
            },
        },
    ];

    const config: TTableConfig<User> = {
        rowClick: (row) => {
            navigate(`/users/${row.id}`);
        },
        currentSort: currentSort,
    }

    if (!isSuccess) {
        return <div>Loading...</div>
    }

    return (
        <MainLayout>
            <Table<User>
                config={config}
                headers={headers}
                data={data.data}
            />
            <Pagination
                page={currentPage}
                lastPage={data.meta.last_page}
                perPage={perPage}
                nextPage={nextPage}
                prevPage={prevPage}
                changePerPage={changePerPage}
            />
        </MainLayout>
    )
}

export default UsersPage;