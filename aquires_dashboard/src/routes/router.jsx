import { createBrowserRouter, Navigate } from "react-router-dom";
// import RootLayout from "../components/layout/AdminLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../components/dashboard/Dashboard";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        // element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            
        ],
    },
]);
