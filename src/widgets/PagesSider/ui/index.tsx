import { Layout, Menu } from "antd";
import { Link } from "react-router";
import { PAGES } from "../model/constants";
import styles from "./PagesSider.module.css";

const { Sider } = Layout;

export const PagesSider = () => {
  return (
    <Sider className={styles.sider}>
      <Menu
        className={styles.menu}
        items={PAGES.map((page) => ({
          key: page.path,
          label: <Link to={page.path}>{page.name}</Link>,
        }))}
      />
    </Sider>
  );
};
