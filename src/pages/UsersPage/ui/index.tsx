import { UserProfile, UserRoles } from "@/entities";
import { useDeleteUserMutation, useGetUsersQuery } from "@/features";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Popconfirm, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router";
// import styles from "./UsersPage.module.css";

export const UsersPage = () => {
  const { data, isError, isLoading } = useGetUsersQuery(undefined, { refetchOnMountOrArgChange: true });

  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  const handleGoToUserById = (id: number) => {
    // убрать replace, возможно убрать явный путь, задавать через именнованную переменную
    navigate("/profile/:id".replace(":id", String(id)), { state: { isAdmin: true } });
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
  };

  const userInfoColumns: ColumnsType<UserProfile> = [
    { title: "Имя", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      render: (date: string) => format(parseISO(date), "dd.MM.yyyy"),
    },
    {
      title: "Статус",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) =>
        isBlocked ? <StopOutlined style={{ color: "red" }} /> : <CheckCircleOutlined style={{ color: "green" }} />,
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: UserRoles[]) => {
        if (!roles || !roles.length) {
          return null;
        }

        return (
          <Flex gap="0.3rem" wrap>
            {roles.map((role) => (
              <Tag key={role}>{role}</Tag>
            ))}
          </Flex>
        );
      },
    },
    { title: "Номер телефона", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Flex gap="0.5rem">
          <Button onClick={() => handleGoToUserById(record.id)}>Открыть</Button>
          <Popconfirm
            title="Вы действительно хотите удаль пользователя?"
            cancelText="Отмена"
            okText="Подтвердить"
            onConfirm={() => handleDeleteUser(record.id)}
          >
            <Button>Удалить</Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  if (isError) {
    return <Alert message="Ошибка загрузки пользователей" type="error" />;
  }

  if (isLoading)
    return (
      <Flex justify="center" style={{ marginBlockStart: "1rem" }}>
        <Spin />
      </Flex>
    );

  if (!data || !data.data || !data.data.length) {
    return <Alert message="Пользователей нет" type="info" />;
  }

  return <Table<UserProfile> columns={userInfoColumns} dataSource={data.data} rowKey="id" size="small" />;
};
