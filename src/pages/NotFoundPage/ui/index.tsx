import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router";
import styles from "./NotFoundPage.module.css";

const { Title } = Typography;

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoToMainPage = () => {
    navigate("/todo");
  };

  return (
    <Flex vertical gap="0.8rem" className={styles.wrapper}>
      <Title level={2}>Страница не найдена</Title>
      <Button className={styles.button} onClick={handleGoToMainPage}>
        Перейти на главную
      </Button>
    </Flex>
  );
};
