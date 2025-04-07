import { Layout } from "antd";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";

const { Content } = Layout;

export const AuthLayout = () => {
  return (
    <Layout className={styles.wrapper}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
