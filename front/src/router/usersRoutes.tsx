import PrivateRoute from "../components/PrivateRoute/PrivateRoute.tsx";
import {ERole} from "../enums/roleseEnum.ts";
import UsersPage from "../pages/Users/UsersPage.tsx";
import ShowUserPage from "../pages/Users/Show/ShowUserPage.tsx";

const routes = [
    {
        path: "/users",
        children: [
            {
                index: true,
                element: <PrivateRoute roles={[ERole.Admin, ERole.User]}><UsersPage /></PrivateRoute>,
            },
            {
                path: "/users/:id",
                element: <PrivateRoute roles={[ERole.Admin, ERole.User]}><ShowUserPage /></PrivateRoute>,
            }
        ],
    },

];

export default routes;
