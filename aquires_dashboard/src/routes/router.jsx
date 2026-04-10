import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../components/dashboard/Dashboard";


export const router = createBrowserRouter([
    {
        path: "/login",
                // element: <RootLayout />,
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },
        ],
    },
    {
        path: "/",
        element: <AdminLayout />,
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
