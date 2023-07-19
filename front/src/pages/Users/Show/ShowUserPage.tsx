import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../store/api/usersApi.ts";
import MainLayout from "../../../layouts/main/MainLayout.tsx";

type TParams = {
    id: string;
}
const ShowUserPage = () => {
    const {id} = useParams<TParams>();
    const {data, isSuccess} = useGetUserQuery(Number(id));
    if (!isSuccess) {
        return <div>Loading...</div>
    }

    const renderedRoles = data.data.roles.map((role) => {
        return (
            <span key={role.id}>{role.name}</span>
        )
    });
    return (
        <MainLayout>
            <h1>User {data.data.id}</h1>
            <p>Name: {data.data.name}</p>
            <p>Email: {data.data.email}</p>
            <p>Roles: {renderedRoles}</p>
        </MainLayout>
    )
}

export default ShowUserPage;