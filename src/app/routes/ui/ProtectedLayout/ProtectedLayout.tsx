import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { PagesSider } from "@/widgets";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router";
import styles from "./ProtectedLayout.module.css";

const { Content } = Layout;

export const ProtectedLayout = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

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
