import { useNavigationVisibility } from "@/shared/hooks";
import { Layout } from "antd";
import { MenuPages } from "./MenuPages";
import styles from "./PagesSider.module.css";

const { Sider } = Layout;

export const PagesSider = () => {
  const { showSider } = useNavigationVisibility();

  if (!showSider) {
    return null;
  }

  return (
    <Sider className={styles.sider}>
      <MenuPages />
    </Sider>
  );
};
