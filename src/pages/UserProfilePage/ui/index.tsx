import { sessionService, useLogoutMutation } from "@/entities";
import { EditUserForm, useGetUserByIdQuery, UserRequest } from "@/features";
import { useAppSelector, useNotification } from "@/shared";
import { Alert, Button, Flex, Spin, Typography } from "antd";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styles from "./UserProfilePage.module.css";

const { Title, Text } = Typography;

export const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useAppSelector((state) => state.session.currentUser);
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const isModerator = useAppSelector((state) => state.admin.isModerator);

  const isAuthority = isAdmin || isModerator;

  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isFromAdminPage = location.state?.isFromAdminPage ?? false;

  const { data: userData, isFetching } = useGetUserByIdQuery(id ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const [logout] = useLogoutMutation();

  const user = isAuthority ? userData : currentUser;

  const notification = useNotification();

  if (isFetching)
    return (
      <Flex justify="center" style={{ marginBlockStart: "1rem" }}>
        <Spin />
      </Flex>
    );

  if (!user) return <Alert message="Ошибка загрузки профиля. Попробуйте перезагрузисть страницу." type="error" />;

  const isAuthorityProfilePage = id === String(currentUser?.id);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      sessionService.clearTokens();
      window.location.reload();
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

  const handleEditUser = () => {
    setIsEditing(true);
  };

  const handleCancelEditUser = () => {
    setIsEditing(false);
  };

  const userInitialValues: UserRequest = {
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };

  return (
    <Flex vertical gap="0.5rem">
      {isEditing ? (
        <>
          <Title level={2}>Редактирование профиля</Title>
          <EditUserForm userId={id} cancelEditing={handleCancelEditUser} initialValues={userInitialValues} />
        </>
      ) : (
        <>
          <Title level={2}>Профиль пользователя</Title>

          {isAuthority && (
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

          <Flex gap="0.4rem" className={styles.buttons}>
            {isAuthority ? (
              <>
                <Button color="primary" variant="solid" className={styles.button} onClick={handleEditUser}>
                  Редактировать
                </Button>
                {isAuthorityProfilePage && (
                  <Button color="primary" variant="solid" className={styles.button} onClick={handleLogout}>
                    Выйти
                  </Button>
                )}
                {isFromAdminPage && (
                  <Button color="primary" variant="solid" className={styles.button} onClick={handleGoBack}>
                    Назад
                  </Button>
                )}
              </>
            ) : (
              <Button color="primary" variant="solid" className={styles.button} onClick={handleLogout}>
                Выйти
              </Button>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
