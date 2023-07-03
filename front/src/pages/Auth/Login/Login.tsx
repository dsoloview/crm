import styles from './Login.module.scss';
import {FC} from "react";
import AuthLayout from "../AuthLayout.tsx";
import Input from "../../../components/Input/Input.tsx";
import Button from "../../../components/Button/Button.tsx";
import {Link} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useLoginMutation} from "../../../store/api/authApi.ts";

interface IFormInput {
    email: string
    password: string
}

const Login: FC = () => {
    const {register, handleSubmit} = useForm<IFormInput>()
    const [loginUser] = useLoginMutation();
    const onSubmit: SubmitHandler<IFormInput> = async (FormData) => {
        const data = await loginUser(FormData)
        console.log(data)
    }
    return (
        <AuthLayout>
            <div className={styles.login}>
                <h2 className={styles.title}>Login</h2>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        register={register}
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        label="Email"
                        required
                    />
                    <Input
                        register={register}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        label="Password"
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
