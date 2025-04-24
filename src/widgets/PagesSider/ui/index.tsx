import { useAppSelector } from "@/shared";
import { Layout, Menu } from "antd";
import { Link } from "react-router";
// import { PAGES } from "../model/constants";
import styles from "./PagesSider.module.css";

const { Sider } = Layout;

export const PagesSider = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);

  const PAGES = [
    { path: "/todo", name: "Список задач" },
    // Почему через replace - убрать
    { path: "/profile/:id".replace(":id", String(currentUser?.id)), name: "Профиль" },
  ];

  if (isAdmin) {
    PAGES.push({ path: "/admin/users", name: "Пользователи" });
  }

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
