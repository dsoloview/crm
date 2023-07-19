import styles from './EditUserPage.module.scss';
import {useParams} from "react-router-dom";
import {useGetUserQuery, useUpdateUserMutation} from "../../../store/api/usersApi.ts";
import MainLayout from "../../../layouts/main/MainLayout.tsx";
import {useForm} from "react-hook-form";
import Input from "../../../components/Input/Input.tsx";
import {useEffect} from "react";
import Button from "../../../components/Button/Button.tsx";
import {IUpdateUserRequest} from "../../../types/Models/User/requests.ts";

type TParams = {
    id: string;
}

const EditUserPage = () => {
    const {id} = useParams<TParams>();
    const {data, isSuccess} = useGetUserQuery(Number(id));
    const {register, handleSubmit, setValue} = useForm<Omit<IUpdateUserRequest, 'id'>>();
    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        if (isSuccess) {
            setValue('name', data.data.name);
            setValue('email', data.data.email);
        }
    })

    if (!isSuccess) {
        return <div>Loading...</div>
    }



    const onSubmit = (data: {name: string, email: string}) => {
        updateUser({id: Number(id), roles: [3] ,...data});
    }


    return (
        <MainLayout>
            <form className={styles.editUserPage} onSubmit={handleSubmit(onSubmit)}>
                <h1>Edit User {data.data.id}</h1>
                <div>Name: <Input type="text" register={register('name')} /></div>
                <div>Email: <Input type="text" register={register('email')} /></div>
                <Button type="submit" >Save</Button>
            </form>
        </MainLayout>
    )
}

export default EditUserPage;