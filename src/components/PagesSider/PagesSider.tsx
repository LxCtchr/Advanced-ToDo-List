import { Button, Flex, Layout } from "antd";
import { useNavigate } from "react-router";
import styles from "./PagesSider.module.css";

const { Sider } = Layout;

export const PagesSider = () => {
  const navigate = useNavigate();

  return (
    <Sider className={styles.sider}>
      <Flex vertical gap="middle">
        <Button color="primary" variant="solid" onClick={() => navigate("/")}>
          Список задач
        </Button>
        <Button color="primary" variant="solid" onClick={() => navigate("profile")}>
          Профиль
        </Button>
      </Flex>
    </Sider>
  );
};
