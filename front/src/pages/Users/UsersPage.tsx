import MainLayout from "../../layouts/main/MainLayout.tsx";
import {useGetUsersQuery} from "../../store/api/usersApi.ts";
import Table from "../../components/Table/Table.tsx";
import {TTableHeader, TTableConfig, TTableRecord, TTableSort} from "../../types/Table/table.types.ts";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import {User} from "../../types/User/model.ts";
import {useState} from "react";

const UsersPage = () => {
    const [sort, setSort] = useState<TTableSort>({field: 'id', direction: 'asc'});
    const {data, isSuccess} = useGetUsersQuery(sort);
    const navigate = useNavigate();
    function defaultSetSort(field: string) {
        setSort(prevState => {
            if (prevState.field === field) {
                return {
                    field: field,
                    direction: prevState.direction === 'asc' ? 'desc' : 'asc',
                }
            }
            return {
                field: field,
                direction: 'asc',
            }
        });
    }

    const headers: TTableHeader[] = [
        {
            name: "id",
            selector: (row: TTableRecord) => row.id,
            tableSort: (field: string) => {
                defaultSetSort(field);
            },
        },
        {
            name: "Name",
            selector: (row: TTableRecord) => row.name,
            tableSort: (field: string) => {
                defaultSetSort(field);
            },
        },
        {
            name: "Email",
            selector: (row: TTableRecord) => row.email,
        },
        {
            name: "Test",
            selector: () => 'HELLO',
        },
        {
            name: "Edit",
            selector: (row: TTableRecord) => {
                return (
                    <Button onClick={() => navigate(`/users/${row.id}/edit`)} type="button">Edit</Button>
                )
            },
        },
    ];

    const config: TTableConfig = {
        rowClick: (row: TTableRecord) => {
            navigate(`/users/${row.id}`);
        },
        currentSort: sort,
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
        </MainLayout>
    )
}

export default UsersPage;