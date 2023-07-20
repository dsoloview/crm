import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../../../store/api/usersApi.ts";
import MainLayout from "../../../layouts/main/MainLayout.tsx";
import {TParamsId} from "../../../types/params.ts";
import Loader from "../../../components/Loader/Loader.tsx";

const ShowUserPage = () => {
    const {id} = useParams<TParamsId>();
    const {data, isSuccess} = useGetUserQuery(Number(id));
    if (!isSuccess) {
        return (
            <MainLayout>
                <Loader />
            </MainLayout>
        )
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