import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CheckOut from "../pages/CheckOut/CheckOut";
import PrivateRoute from "./Private/PrivateRoute";
import AllBookings from "../pages/AllBookings/AllBookings";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/checkOut/:id",
                element: (
                    <PrivateRoute>
                        <CheckOut />
                    </PrivateRoute>
                ),
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/services/${params.id}`),
            },
            {
                path: "/allBookings",
                element: (
                    <PrivateRoute>
                        <AllBookings></AllBookings>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export default router;
