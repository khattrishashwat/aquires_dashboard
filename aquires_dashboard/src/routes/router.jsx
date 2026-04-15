import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/auth/ForgetPassword";
import OTP from "../pages/auth/Verify";
import ResetPassword from "../pages/auth/ResetPassword";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                path: "login",
                element: <Login />,
            },
            {
                path: "forget-password",
                element: <ForgotPassword />,
            },
            {
                path:"otp-verify",
                element: <OTP />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
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
