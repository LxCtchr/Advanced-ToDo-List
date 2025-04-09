import { sessionService } from "@/entities";
import { setIsAuth, useRefreshTokensMutation } from "@/features";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { PagesSider } from "@/widgets";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import styles from "./ProtectedLayout.module.css";

const { Content } = Layout;

export const ProtectedLayout = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const [refreshTokens] = useRefreshTokensMutation();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

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
      } catch {
        sessionService.clearTokens();
      }

      setIsAppInitialized(true);
    };

    checkAuth();
  }, [dispatch, refreshTokens]);

  if (!isAppInitialized) {
    return <Spin fullscreen />;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout className={styles.wrapper}>
      <PagesSider />
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};
