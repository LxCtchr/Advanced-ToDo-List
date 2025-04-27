import { sessionService, setUser, useLazyGetUserProfileQuery } from "@/entities";
import { setIsAuth, useRefreshTokensMutation } from "@/features";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { PagesSider } from "@/widgets";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { roleActionMap } from "../../../store";
import styles from "./ProtectedLayout.module.css";

const { Content } = Layout;

export const ProtectedLayout = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const [refreshTokens] = useRefreshTokensMutation();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const [trigger, { isLoading }] = useLazyGetUserProfileQuery();

  useEffect(() => {
    const checkAuth = async () => {
      const currentRefreshToken = localStorage.getItem("refreshToken");

      if (!currentRefreshToken) {
        sessionService.clearTokens();
        setIsAppInitialized(true);

        return;
      }

      try {
        const { accessToken, refreshToken } = await refreshTokens(currentRefreshToken).unwrap();
        sessionService.accessToken = accessToken;
        localStorage.setItem("refreshToken", refreshToken);

        await dispatch(setIsAuth(true));

        const userResult = await trigger().unwrap();

        userResult.roles.forEach((role) => {
          const actionCreator = roleActionMap[role];
          if (actionCreator) {
            dispatch(actionCreator(true));
          }
        });

        await dispatch(setUser(userResult));
      } catch {
        sessionService.clearTokens();
        await dispatch(setIsAuth(false));
        await dispatch(setUser(null));
      }

      setIsAppInitialized(true);
    };

    checkAuth();
  }, [dispatch, refreshTokens, trigger]);

  if (!isAppInitialized || isLoading) {
    return <Spin fullscreen />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout className={styles.wrapper} hasSider>
      <PagesSider />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};
