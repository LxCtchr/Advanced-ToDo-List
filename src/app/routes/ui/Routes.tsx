import { AuthLayout } from "@/features/Authorization";
import { LoginPage, NotFoundPage, RegistrationPage, TodoListPage, UserProfilePage } from "@/pages";
import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedLayout } from "./ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/todo",
        element: <TodoListPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
