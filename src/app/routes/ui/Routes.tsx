import { AuthLayout } from "@/features";
import { LoginPage, NotFoundPage, RegistrationPage, TodoListPage, UserProfilePage } from "@/pages";
import { createBrowserRouter, Navigate } from "react-router";
import { UsersPage } from "../../../pages/UsersPage/ui";
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
        path: "/profile/:id",
        element: <UserProfilePage />,
      },
      {
        path: "/todo",
        element: <TodoListPage />,
      },
      {
        path: "/admin/users",
        element: <UsersPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
