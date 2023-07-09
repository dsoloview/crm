import styles from './Registration.module.scss';
import {FC} from "react";
import AuthLayout from "../AuthLayout.tsx";
import Input from "../../../components/Input/Input.tsx";
import Button from "../../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRegisterMutation} from "../../../store/api/authApi.ts";
import ServerError from "../../../components/ServerError/ServerError.tsx";
import {getErrorMessage} from "../../../utils/errorHelpers.ts";

interface IFormInput {
    email: string
    name: string
    password: string
    password_confirmation: string
}

const formValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Incorrect email").min(1, "Email is required"),
    password: z.string()
        .min(1, "Password id required")
        .min(6, 'Password should have more than 6 characters'),
    password_confirmation: z.string()
        .min(1, "Password confirmation is required")
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

const Registration: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInput>({
        resolver: zodResolver(formValidationSchema)
    });

    const navigate = useNavigate();
    const [registerUser, {error}] = useRegisterMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (FormData) => {
        registerUser(FormData)
            .unwrap()
            .then(() => {
                navigate('/')
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <AuthLayout>
            <div className={styles.registration}>
                <h2 className={styles.title}>Registration</h2>
                <ServerError message={getErrorMessage(error)} />
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        register={register('name')}
                        type="text"
                        placeholder="Enter your name"
                        label="Name"
                        error={errors.name}
                    />
                    <Input
                        register={register('email')}
                        type="text"
                        placeholder="Enter your email"
                        label="Email"
                        error={errors.email}
                    />
                    <Input
                        register={register('password')}
                        type="password"
                        placeholder="Enter password"
                        label="Password"
                        error={errors.password}
                    />
                    <Input
                        register={register('password_confirmation')}
                        type="password"
                        placeholder="Confirm password"
                        label="Password confirmation"
                        error={errors.password_confirmation}
                    />
                    <Button
                        className={styles.button}
                        type="submit" >
                        Register
                    </Button>
                </form>
                <div>
                    Have an account? <Link to="/auth/login">Login</Link>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Registration;
