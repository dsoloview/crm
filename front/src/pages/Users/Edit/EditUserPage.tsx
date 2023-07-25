import styles from './EditUserPage.module.scss';
import {useParams} from "react-router-dom";
import {useGetUserQuery, useUpdateUserMutation} from "../../../store/api/usersApi.ts";
import MainLayout from "../../../layouts/main/MainLayout.tsx";
import {useForm} from "react-hook-form";
import Input from "../../../components/Form/Input/Input.tsx";
import {useEffect} from "react";
import Button from "../../../components/Button/Button.tsx";
import {TParamsId} from "../../../types/params.ts";
import RolesSelect from "../../../components/Form/Selects/RolesSelect/RolesSelect.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "../../../components/Form/Form.tsx";
import {toast} from "react-toastify";
import Loader from "../../../components/Loader/Loader.tsx";
import {isServerValidationError} from "../../../utils/errorHelpers.ts";

type TEditUserForm = {
    name: string,
    email: string,
    role: number
    password?: string
    password_confirmation?: string
}

const formValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, 'Role is required').or(z.number().min(1, "Role is required")),
    email: z.string().email().min(1, "Email is required"),
    password: z.string()
        .min(1, "Password is required")
        .min(6, 'Password should have more than 6 characters')
        .optional()
        .or(z.literal('')),
    password_confirmation: z.string()
        .min(1, "Password confirmation is required")
        .min(6, 'Password should have more than 6 characters')
        .optional()
        .or(z.literal('')),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

const EditUserPage = () => {
    const {id} = useParams<TParamsId>();
    const {data, isSuccess} = useGetUserQuery(Number(id));
    const {register,
        handleSubmit,
        setValue,
        formState: {errors, isDirty},
        reset} = useForm<TEditUserForm>(
        {
            mode: 'onChange',
            resolver: zodResolver(formValidationSchema)
        }
    );
    const [updateUser, {isSuccess: isUpdateSuccess, error: serverError }] = useUpdateUserMutation();

    useEffect(() => {
        if (isSuccess) {
            setValue('name', data.data.name);
            setValue('email', data.data.email);
            setValue('role', data.data.roles[0]?.id);
        }
    }, [data, isSuccess, setValue])

    useEffect(() => {
        if (isUpdateSuccess) {
            reset({password: '', password_confirmation: ''});
            toast.success('User updated successfully');
        }
    }, [isUpdateSuccess, reset])

    if (!isSuccess) {
        return (
            <MainLayout>
                <Loader />
            </MainLayout>
        )
    }



    const onSubmit = async (data: TEditUserForm) => {
        await updateUser({id: Number(id),...data});
    }
console.log(serverError);
    return (
        <MainLayout>
            <h1>Edit User {data.data.id}</h1>
            <Form className={styles.editUserForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputContainer}>
                    Name: <Input
                    type="text"
                    register={register('name')}
                    error={errors.name}
                    serverError={isServerValidationError(serverError) ? serverError.data.errors?.name : []}
                />
                </div>
                <div className={styles.inputContainer}>
                    Email: <Input
                    type="text"
                    register={register('email')}
                    error={errors.email}
                    serverError={isServerValidationError(serverError) ? serverError.data.errors?.email : []}
                />
                </div>
                <div className={styles.inputContainer}>
                    Roles: <RolesSelect
                    name="role"
                    register={register}
                    error={errors.role}
                    serverError={isServerValidationError(serverError) ? serverError.data.errors?.role : []}
                />
                </div>
                <div className={styles.inputContainer}>
                    Password: <Input
                    type="text"
                    register={register('password')}
                    error={errors.password}
                    serverError={isServerValidationError(serverError) ? serverError.data.errors?.password : []}
                />
                </div>
                <div className={styles.inputContainer}>
                    Password Confirmation: <Input
                    type="text"
                    register={register('password_confirmation')}
                    error={errors.password_confirmation}
                    serverError={isServerValidationError(serverError) ? serverError.data.errors?.password_confirmation : []}
                />
                </div>
                <Button disabled={!isDirty} type="submit" >Save</Button>
            </Form>
        </MainLayout>
    )
}

export default EditUserPage;