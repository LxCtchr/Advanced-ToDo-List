import { sessionService } from "@/entities/Session";
import { useGetUserProfileQuery, useLogoutMutation } from "@/entities/User";
import { useNotification } from "@/shared";
import { Alert, Button, Flex, Spin, Typography } from "antd";
import { useNavigate } from "react-router";
import styles from "./UserProfilePage.module.css";

const { Title, Text } = Typography;

export const UserProfilePage = () => {
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined, { refetchOnMountOrArgChange: true });

  const [logout] = useLogoutMutation();

  const notification = useNotification();

  const navigate = useNavigate();

  if (isLoading)
    return (
      <Flex justify="center" style={{ marginBlockStart: "1rem" }}>
        <Spin />
      </Flex>
    );

  if (!userData) return <Alert message="Ошибка загрузки профиля" type="error" />;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("refreshToken");
      sessionService.accessToken = null;
      navigate("/login");
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Произошла непредвиденная ошибка выхода. Попробуйте позже",
      });
    }
  };

  return (
    <Flex vertical gap="0.5rem">
      <Title level={2}>Профиль пользователя</Title>

      <Text className={styles.text}>
        <b>Имя</b>: {userData.username}
      </Text>
      <Text className={styles.text}>
        <b>Email</b>: {userData.email}
      </Text>
      <Text className={styles.text}>
        <b>Телефон</b>: {userData.phoneNumber || "Отсутствует"}
      </Text>
      <Text className={styles.text}>
        <b>Дата регистрации</b>: {new Date(userData.date).toLocaleDateString()}
      </Text>
      <Text className={styles.text}>
        <b>Статус</b>: {userData.isBlocked ? "Заблокирован" : "Активен"}
      </Text>

      <Flex className={styles.buttons}>
        <Button color="primary" variant="solid" className={styles.button} onClick={handleLogout}>
          Выйти
        </Button>
      </Flex>
    </Flex>
  );
};
