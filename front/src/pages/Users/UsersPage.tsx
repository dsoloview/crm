import MainLayout from "../../layouts/main/MainLayout.tsx";
import {useGetUsersQuery} from "../../store/api/usersApi.ts";
import Table from "../../components/Table/Table.tsx";
import {TTableHeader, TTableConfig, TTableRecord} from "../../types/Table/table.types.ts";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button.tsx";
import {User} from "../../types/User/model.ts";

const UsersPage = () => {
    const {data, isSuccess} = useGetUsersQuery();
    const navigate = useNavigate();

    const headers: TTableHeader[] = [
        {
            name: "id",
            selector: (row: TTableRecord) => row.id,
            hasSort: true,
        },
        {
            name: "Name",
            selector: (row: TTableRecord) => row.name,
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
        }
    }

    if (!isSuccess) {
        return <div>Loading...</div>
    }

    return (
        <MainLayout>
            <Table<User> config={config} headers={headers} data={data.data} />
        </MainLayout>
    )
}

export default UsersPage;