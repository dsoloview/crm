import {FC} from "react";
import {WithChildrenProps} from "../../types/types.ts";
import styles from "./AuthLauout.module.scss";

import dashboard from "../../assets/images/auth/dashboard.png";
import logo from "../../assets/images/logo.svg";
import settings from "../../assets/images/icons/settings.svg";
import {Link} from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect.ts";

type Props = & WithChildrenProps;
const AuthLayout: FC<Props> = (
    {
        children
    }) => {

    useAuthRedirect();

    return (
        <div className={styles.authLayout}>
            <div className={styles.leftPart}>
                <header className={styles.header}>
                    <img className={styles.logo} src={logo} alt="logo icon"/>
                    <Link to="/"  className={styles.helpContainer}>
                        <img src={settings} alt="settings icon"/>
                        <p>Help</p>
                    </Link>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </div>

            <div className={styles.rightPart} >
                <h2 className={styles.title}>Collaboration with influencers made easy.</h2>
                    <img className={styles.image} src={dashboard} alt="dashboard"/>
            </div>
        </div>
    )
}

export default AuthLayout;
