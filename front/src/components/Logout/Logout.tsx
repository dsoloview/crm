import {FC} from "react";
import Button from "../Button/Button.tsx";
import {useLogoutMutation} from "../../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";

const Logout : FC = () => {
    const [logoutUser] = useLogoutMutation();
    const navigate = useNavigate();
    function handleLogout() {
        logoutUser();
        navigate('/auth/login')
    }

    return (
        <Button onClick={handleLogout} type='button'>Logout</Button>
    )
}

export default Logout;