import Login from "../pages/Auth/Login/Login.tsx";
import Registration from "../pages/Auth/Registration/Registration.tsx";
import {Navigate} from "react-router-dom";

const routes = [
    {
        path: "/auth",
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" />,
            },
            {
                path: "/auth/login",
                element: <Login />,
            },
            {
                path: "/auth/register",
                element: <Registration />
            },
        ],
    },

];

export default routes;
