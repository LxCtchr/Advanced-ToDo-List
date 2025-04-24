import { Roles, UserProfile } from "@/entities";
import { useDeleteUserMutation, useGetUsersQuery } from "@/features";
import { useDebounce } from "@/shared";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, Popconfirm, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { format, parseISO } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
// import styles from "./UsersPage.module.css";

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  const navigate = useNavigate();

  const debouncedQuery = useDebounce(searchQuery);

  const { data, isError, isLoading, isFetching } = useGetUsersQuery(
    { search: debouncedQuery },
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser] = useDeleteUserMutation();

  const handleGoToUserById = (id: number) => {
    // убрать replace, возможно убрать явный путь, задавать через именнованную переменную
    navigate("/profile/:id".replace(":id", String(id)), { state: { isFromAdminPage: true } });
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
      render: (roles: Roles[]) => {
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
          <Button onClick={() => handleGoToUserById(record.id)}>Перейти к профилю</Button>
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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (isError) {
    return <Alert message="Ошибка загрузки пользователей. Перезагрузите страницу" type="error" />;
  }

  if (isLoading) {
    return (
      <Flex justify="center" style={{ marginBlockStart: "1rem" }}>
        <Spin />
      </Flex>
    );
  }

  const isUsersQueryEmpty = (!data || !data.data || !data.data.length) && !isLoading && !isFetching;

  return (
    <Flex vertical>
      <Form>
        <Form.Item>
          <Input type="text" placeholder="Поиск" onChange={handleSearch} />
        </Form.Item>
      </Form>
      {!isUsersQueryEmpty ? (
        <Table<UserProfile> columns={userInfoColumns} dataSource={data.data} rowKey="id" size="small" />
      ) : (
        <Alert message="Пользователей нет" type="info" />
      )}
    </Flex>
  );
};
