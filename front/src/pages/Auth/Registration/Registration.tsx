import styles from './Registration.module.scss';
import {FC} from "react";
import AuthLayout from "../AuthLayout.tsx";
import Input from "../../../components/Input/Input.tsx";
import Button from "../../../components/Button/Button.tsx";
import {Link} from "react-router-dom";

const Registration: FC = () => {
    return (
        <AuthLayout>
            <div className={styles.registration}>
                <h2 className={styles.title}>Registration</h2>
                <form className={styles.form}>
                    <Input type="text" placeholder="Enter your name" label="Name" />
                    <Input type="text" placeholder="Enter your email" label="Email" />
                    <Input type="password" placeholder="Enter password" label="Password" />
                    <Button className={styles.button} type="submit" >Register</Button>
                </form>
                <div>
                    Have an account? <Link to="/auth/login">Login</Link>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Registration;
