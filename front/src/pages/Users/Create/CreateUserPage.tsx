import MainLayout from "../../../layouts/main/MainLayout.tsx";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateUserMutation} from "../../../store/api/usersApi.ts";
import {useEffect} from "react";
import {toast} from "react-toastify";
import styles from "./CreateUserPage.module.scss";
import Input from "../../../components/Form/Input/Input.tsx";
import {isServerValidationError} from "../../../utils/errorHelpers.ts";
import RolesSelect from "../../../components/Form/Selects/RolesSelect/RolesSelect.tsx";
import Button from "../../../components/Button/Button.tsx";
import Form from "../../../components/Form/Form.tsx";

type TCreateUserForm = {
    name: string,
    email: string,
    role: number
    password: string
    password_confirmation: string
}

const formValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, 'Role is required').or(z.number().min(1, "Role is required")),
    email: z.string().email().min(1, "Email is required"),
    password: z.string()
        .min(1, "Password is required")
        .min(6, 'Password should have more than 6 characters'),
    password_confirmation: z.string()
        .min(1, "Password confirmation is required")
        .min(6, 'Password should have more than 6 characters')
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

const CreateUserPage = () => {
    const {register,
        handleSubmit,
        setValue,
        formState: {errors, isDirty}
    } = useForm<TCreateUserForm>(
        {
            mode: 'onChange',
            resolver: zodResolver(formValidationSchema)
        }
    );
    const [createUser, {isSuccess, error: serverError }] = useCreateUserMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: TCreateUserForm) => {
        await createUser(data);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('User created');
            navigate('/users');
        }

        if (serverError) {
            setValue('password', '');
            setValue('password_confirmation', '');
        }
    }, [isSuccess, serverError])

    return (
        <MainLayout>
            <h1>Create user</h1>
            <Form className={styles.createUserForm} onSubmit={handleSubmit(onSubmit)}>
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

export default CreateUserPage;
