import { sessionService, useLogoutMutation } from "@/entities";
import { useGetUserByIdQuery } from "@/features";
import { useAppSelector, useNotification } from "@/shared";
import { Alert, Button, Flex, Spin, Typography } from "antd";
import { format, parseISO } from "date-fns";
import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./UserProfilePage.module.css";

const { Title, Text } = Typography;

export const UserProfilePage = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const locate = useLocation();
  const { id } = useParams<{ id: string }>();
  const isAdmin = locate.state?.isAdmin ?? false;

  const { data: userData, isLoading } = useGetUserByIdQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  });

  const user = isAdmin ? userData : currentUser;

  const [logout] = useLogoutMutation();

  const notification = useNotification();

  const navigate = useNavigate();

  if (isLoading)
    return (
      <Flex justify="center" style={{ marginBlockStart: "1rem" }}>
        <Spin />
      </Flex>
    );

  if (!user) return <Alert message="Ошибка загрузки профиля" type="error" />;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      sessionService.clearTokens();
      navigate("/login");
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Произошла непредвиденная ошибка выхода. Попробуйте позже",
      });
    }
  };

  const handleGoBack = () => {
    navigate("/admin/users");
  };

  return (
    <Flex vertical gap="0.5rem">
      <Title level={2}>Профиль пользователя</Title>

      {isAdmin && (
        <Text className={styles.text}>
          <b>ID пользователя</b>: {user.id}
        </Text>
      )}
      <Text className={styles.text}>
        <b>Имя</b>: {user.username}
      </Text>
      <Text className={styles.text}>
        <b>Email</b>: {user.email}
      </Text>
      <Text className={styles.text}>
        <b>Телефон</b>: {user.phoneNumber || "Отсутствует"}
      </Text>
      <Text className={styles.text}>
        <b>Дата регистрации</b>: {format(parseISO(user.date), "dd.MM.yyyy")}
      </Text>
      <Text className={styles.text}>
        <b>Статус</b>: {user.isBlocked ? "Заблокирован" : "Активен"}
      </Text>

      <Flex className={styles.buttons}>
        {isAdmin ? (
          <Button color="primary" variant="solid" className={styles.button} onClick={handleGoBack}>
            Назад
          </Button>
        ) : (
          <Button color="primary" variant="solid" className={styles.button} onClick={handleLogout}>
            Выйти
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
