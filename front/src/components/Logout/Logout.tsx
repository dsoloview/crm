import {FC} from "react";
import Button from "../Button/Button.tsx";
import {useLogoutMutation} from "../../store/api/authApi.ts";

const Logout : FC = () => {
    const [logoutUser] = useLogoutMutation();
    function handleLogout() {
        logoutUser();
    }

    return (
        <Button onClick={handleLogout} type='button'>Logout</Button>
    )
}

export default Logout;