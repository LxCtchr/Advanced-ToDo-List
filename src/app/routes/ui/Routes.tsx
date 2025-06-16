import { AuthLayout } from "@/features/Authorize";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RegistrationPage } from "@/pages/RegistrationPage";
import { TodoListPage } from "@/pages/TodoListPage";
import { UserProfilePage } from "@/pages/UserProfilePage";
import { UsersPage } from "@/pages/UsersPage";
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
