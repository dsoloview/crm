import {createBrowserRouter} from "react-router-dom";
import ComponentsPage from "../pages/ComponentsPage/ComponentsPage.tsx";
import authRoutes from "./authRoutes.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Home</div>,
    },
    {
        path: "/components",
        element: <ComponentsPage />,
    },
    ...authRoutes
])

export default router;
