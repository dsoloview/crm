import PrivateRoute from "../components/PrivateRoute/PrivateRoute.tsx";
import {ERole} from "../enums/roleseEnum.ts";
import UsersPage from "../pages/Users/UsersPage.tsx";
import ShowUserPage from "../pages/Users/Show/ShowUserPage.tsx";
import EditUserPage from "../pages/Users/Edit/EditUserPage.tsx";
import {RouteObject} from "react-router-dom";
import UserBreadcrumb from "../pages/Users/UserBreadcrumb/UserBreadcrumb.tsx";

const routes:  RouteObject[] = [
    {
        path: "/users",
        handle: {
            crumb: () => 'Users'
        },
        children: [
            {
                index: true,
                element: <PrivateRoute roles={[ERole.Admin]}><UsersPage /></PrivateRoute>,
            },
            {
                path: "/users/:id",
                element: <PrivateRoute roles={[ERole.Admin, ERole.User]}><ShowUserPage /></PrivateRoute>,
                handle: {
                    crumb: () => <UserBreadcrumb type='show' />
                }
            },
            {
                path: "/users/:id/edit",
                element: <PrivateRoute roles={[ERole.Admin]}><EditUserPage /></PrivateRoute>,
                handle: {
                    crumb: () => <UserBreadcrumb type={'edit'} />
                }
            }
        ]
    },
];

export default routes;
