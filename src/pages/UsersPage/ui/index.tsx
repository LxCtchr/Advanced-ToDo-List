import { Roles, UserProfile } from "@/entities";
import { useDeleteUserMutation, useGetUsersQuery, UserFilters } from "@/features";
import { useDebounce } from "@/shared";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Input, Popconfirm, Radio, Spin, Tag } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { format, parseISO } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./UsersPage.module.css";

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [sorter, setSorter] = useState<Pick<UserFilters, "sortBy" | "sortOrder">>({});

  const navigate = useNavigate();

  const debouncedQuery = useDebounce(searchQuery);

  // todo - сделать валидацию в редактировании пользователя

  const { data, isError, isLoading, isFetching } = useGetUsersQuery(
    {
      search: debouncedQuery,
      limit: 10,
      offset: currentPage - 1,
      isBlocked: isBlocked ?? undefined,
      sortBy: sorter.sortBy,
      sortOrder: sorter.sortOrder,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser] = useDeleteUserMutation();

  const handleGoToUserById = (id: number) => {
    navigate(`/profile/${id}`, { state: { isFromAdminPage: true } });
  };

  const handleDeleteUser = async (id: number) => {
    // try catch
    await deleteUser(id);
  };

  const userInfoColumns: ColumnsType<UserProfile> = [
    { title: "Имя", dataIndex: "username", key: "username", sorter: true },
    { title: "Email", dataIndex: "email", key: "email", sorter: true },
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
      filterDropdown: ({ setSelectedKeys, confirm }) => (
        <Radio.Group
          value={isBlocked === null ? "all" : isBlocked ? "blocked" : "active"}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedKeys([value]);
            confirm();
          }}
          className={styles.radioGroup}
        >
          <Radio value="all">Все</Radio>
          <Radio value="active">Активен</Radio>
          <Radio value="blocked">Заблокирован</Radio>
        </Radio.Group>
      ),
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
          {/* Только для админа. Модератор не видит */}
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
    setCurrentPage(1);
  };

  const handleTableChange = (
    pag: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sort: SorterResult<UserProfile> | SorterResult<UserProfile>[]
  ) => {
    setCurrentPage(pag.current ?? 1);

    const isBlockedVals = filters.isBlocked;
    if (isBlockedVals && isBlockedVals.length && isBlockedVals[0] !== "all") {
      setIsBlocked(isBlockedVals[0] === "blocked");
    } else {
      setIsBlocked(null);
    }

    const singleSort = Array.isArray(sort) ? sort[0] : sort;
    if (singleSort.order && singleSort.field) {
      setSorter({
        sortBy: singleSort.field as string,
        sortOrder: singleSort.order === "ascend" ? "asc" : "desc",
      });
    } else {
      setSorter({});
    }
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

  const isUsersQueryEmpty = (!data || !data.data || !data.data.length) && !isFetching;

  return (
    <Flex vertical gap="0.4rem">
      <Input type="text" placeholder="Поиск" onChange={handleSearch} allowClear />
      <Table<UserProfile>
        columns={userInfoColumns}
        dataSource={data?.data}
        rowKey="id"
        size="small"
        pagination={{ current: currentPage, total: data?.meta.totalAmount, pageSize: 10 }}
        onChange={handleTableChange}
        style={{ tableLayout: "fixed" }}
        loading={isFetching}
      />
      {isUsersQueryEmpty && <Alert message="Пользователей нет" type="info" />}
    </Flex>
  );
};
