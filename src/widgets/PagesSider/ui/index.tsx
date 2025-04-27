import { useAppSelector } from "@/shared";
import { Layout, Menu } from "antd";
import { Link } from "react-router";
import styles from "./PagesSider.module.css";

const { Sider } = Layout;

export const PagesSider = () => {
  const currentUser = useAppSelector((state) => state.session.currentUser);
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isModerator = useAppSelector((state) => state.admin.isModerator);

  const pages = [
    { path: "/todo", name: "Список задач" },
    { path: `/profile/${currentUser!.id ?? ""}`, name: "Профиль" },
  ];

  if (isAdmin || isModerator) {
    pages.push({ path: "/admin/users", name: "Пользователи" });
  }

  return (
    <Sider className={styles.sider}>
      <Menu
        className={styles.menu}
        items={pages.map((page) => ({
          key: page.path,
          label: <Link to={page.path}>{page.name}</Link>,
        }))}
      />
    </Sider>
  );
};
