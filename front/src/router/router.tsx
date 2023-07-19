import {createBrowserRouter} from "react-router-dom";
import ComponentsPage from "../pages/ComponentsPage/ComponentsPage.tsx";
import authRoutes from "./authRoutes.tsx";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.tsx";
import {ERole} from "../enums/roleseEnum.ts";
import HomePage from "../pages/Home/HomePage.tsx";
import usersRoutes from "./usersRoutes.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
              index: true,
              element: <PrivateRoute roles={[ERole.User, ERole.Admin]}><HomePage /></PrivateRoute>,
            },
            ...usersRoutes,
            ...authRoutes,
            {
                path: "/components",
                element: <PrivateRoute roles={[ERole.User]}><ComponentsPage /></PrivateRoute>,
            },
        ],
        handle: {
            crumb: () => 'Home',
        }
    },
])

export default router;
