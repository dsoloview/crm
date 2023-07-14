import {FC} from "react";
import {useLogoutMutation} from "../../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import styles from './Logout.module.scss';
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import MenuIcon from "../MenuIcon/MenuIcon.tsx";

const Logout : FC = () => {
    const [logoutUser] = useLogoutMutation();
    const navigate = useNavigate();
    async function handleLogout() {
        await logoutUser();
        navigate('/auth/login')
    }

    return (
        <button className={styles.button} onClick={handleLogout}>
            <MenuIcon icon={faArrowRightFromBracket} />Logout
        </button>
    )
}

export default Logout;