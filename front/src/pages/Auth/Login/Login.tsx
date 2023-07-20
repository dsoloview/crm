import styles from './Login.module.scss';
import {FC} from "react";
import AuthLayout from "../../../layouts/auth/AuthLayout.tsx";
import Input from "../../../components/Form/Input/Input.tsx";
import Button from "../../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useLoginMutation} from "../../../store/api/authApi.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import ServerError from "../../../components/ServerError/ServerError.tsx";
import {getErrorMessage} from "../../../utils/errorHelpers.ts";

interface IFormInput {
    email: string
    password: string
}

const formValidationSchema = z.object({
    email: z.string().email('Invalid email').min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
})

const Login: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IFormInput>({
        resolver: zodResolver(formValidationSchema)
    })
    const navigate = useNavigate();
    const [loginUser, {error}] = useLoginMutation();
    const onSubmit: SubmitHandler<IFormInput> = (FormData) => {
        loginUser(FormData)
            .unwrap()
            .then(() => {
                navigate('/')
            }).catch(error => {
                console.log(error)
        })
    }

    return (
        <AuthLayout>
            <div className={styles.login}>
                <h2 className={styles.title}>Login</h2>
                {error && <ServerError message={getErrorMessage(error)} />}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <Button
                        className={styles.button}
                        type="submit">
                        Login
                    </Button>
                </form>
                <div>
                    Not registered yet? <Link to="/auth/register">Register</Link>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login;
