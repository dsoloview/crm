import {createBrowserRouter} from "react-router-dom";
import ComponentsPage from "../pages/ComponentsPage/ComponentsPage.tsx";
import authRoutes from "./authRoutes.tsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.tsx";
import {ERole} from "../enums/roleseEnum.ts";
import Home from "../pages/Home/Home.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute roles={[ERole.User, ERole.Admin]}><Home /></PrivateRoute>,
    },
    {
        path: "/components",
        element: <PrivateRoute roles={[ERole.User]}><ComponentsPage /></PrivateRoute>,
    },
    ...authRoutes
])

export default router;
