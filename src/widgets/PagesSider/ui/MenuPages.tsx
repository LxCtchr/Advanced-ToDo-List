import { useAppSelector } from "@/shared/hooks";
import { Menu } from "antd";
import { Link, useLocation } from "react-router";
import styles from "./PagesSider.module.css";

export const MenuPages = () => {
  const currentUser = useAppSelector((state) => state.session.currentUser);
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isModerator = useAppSelector((state) => state.admin.isModerator);

  const location = useLocation();

  const pages = [
    { path: "/todo", name: "Список задач" },
    { path: `/profile/${currentUser!.id ?? ""}`, name: "Профиль" },
  ];

  if (isAdmin || isModerator) {
    pages.push({ path: "/admin/users", name: "Пользователи" });
  }

  return (
    <Menu
      className={styles.menu}
      selectedKeys={[location.pathname]}
      items={pages.map((page) => ({
        key: page.path,
        label: (
          <Link
            to={page.path}
            onClick={(event) => {
              if (location.pathname === page.path) {
                event.preventDefault();
              }
            }}
          >
            {page.name}
          </Link>
        ),
      }))}
    />
  );
};
