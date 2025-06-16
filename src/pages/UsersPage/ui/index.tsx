import { Roles, UserProfile } from "@/entities/User";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useEditUserRightsMutation,
  useGetUsersQuery,
  UserFilters,
  useUnblockUserMutation,
} from "@/features/Administer";
import {
  useAppSelector,
  useDebounce,
  useNavigationVisibility,
  useNotification,
} from "@/shared/hooks";
import {
  CheckCircleOutlined,
  MenuUnfoldOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Spin,
  Tag,
} from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { format, parseISO } from "date-fns";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { MenuPages } from ""../../.."/widgets/PagesSider/ui/MenuPages";
import { ROLES_TEXT } from "../model/constants";
import styles from "./UsersPage.module.css";

export const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [sorter, setSorter] = useState<
    Pick<UserFilters, "sortBy" | "sortOrder">
  >({});
  const [isVisible, setIsVisible] = useState(false);

  const { showModalButton } = useNavigationVisibility();

  const isAdmin = useAppSelector((state) => state.admin.isAdmin);

  const navigate = useNavigate();

  const notification = useNotification();

  // Для практики свой сделал
  const debouncedQuery = useDebounce(searchQuery);

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
  const [blockUser, { isLoading: isBlockLoading }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblockLoading }] =
    useUnblockUserMutation();
  const [editUserRoles, { isLoading: isEditUserRolesLoading }] =
    useEditUserRightsMutation();

  const handleGoToUserById = (id: number) => {
    navigate(`/profile/${id}`, { state: { isFromAdminPage: true } });
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Ошибка удаления профиля пользователя. Попробуйте позже",
      });
    }
  };

  const handleManageUserStatus = async (id: number, isBanned: boolean) => {
    try {
      if (isBanned) {
        await unblockUser(id).unwrap();
      } else {
        await blockUser(id).unwrap();
      }
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Ошибка изменения статуса пользователя. Попробуйте позже",
      });
    }
  };

  const handleManageUserRoles = async (
    record: UserProfile,
    role: Roles,
    hasRole: boolean
  ) => {
    const newRoles = hasRole
      ? record.roles.filter((r) => r !== role)
      : [...record.roles, role];
    try {
      await editUserRoles({
        id: record.id,
        roles: { roles: newRoles },
      }).unwrap();
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Ошибка изменения прав пользователя. Попробуйте позже",
      });
    }
  };

  const userInfoColumns: ColumnsType<UserProfile> = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: true,
      sortOrder:
        sorter.sortBy === "username"
          ? sorter.sortOrder === "asc"
            ? "ascend"
            : "descend"
          : undefined,
      onCell: () => ({
        style: {
          maxWidth: "8vw",
        },
      }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder:
        sorter.sortBy === "email"
          ? sorter.sortOrder === "asc"
            ? "ascend"
            : "descend"
          : undefined,
      onCell: () => ({
        style: {
          maxWidth: "8vw",
        },
      }),
    },
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
      filteredValue:
        isBlocked === null ? undefined : [isBlocked ? "blocked" : "active"],
      render: (isBlocked: boolean) =>
        isBlocked ? (
          <StopOutlined style={{ color: "red" }} />
        ) : (
          <CheckCircleOutlined style={{ color: "green" }} />
        ),
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
      onCell: () => ({
        style: {
          maxWidth: "10vw",
        },
      }),
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      onCell: () => ({
        style: {
          maxWidth: "10vw",
        },
      }),
    },
    {
      title: "Управление",
      dataIndex: "management",
      key: "management",
      render: (_, record) => {
        const allRoles = Object.values(Roles).filter((r) => r !== "USER");
        return (
          <Flex vertical wrap gap="0.6rem">
            <Popconfirm
              title={
                record.isBlocked
                  ? "Разблокировать пользователя?"
                  : "Заблокировать пользователя?"
              }
              cancelText="Отмена"
              okText="Подтвердить"
              onConfirm={() =>
                handleManageUserStatus(record.id, record.isBlocked)
              }
            >
              <Button
                loading={record.isBlocked ? isUnblockLoading : isBlockLoading}
                size="small"
              >
                {record.isBlocked ? "Разблокировать" : "БАН"}
              </Button>
            </Popconfirm>
            {isAdmin &&
              allRoles.map((role) => {
                if (!record.roles || !Array.isArray(record.roles)) {
                  return null;
                }
                const hasRole = record.roles.includes(role);

                return (
                  <Popconfirm
                    key={role}
                    title={`${hasRole ? "Забрать" : "Дать"} ${
                      ROLES_TEXT[role]
                    }?`}
                    cancelText="Отмена"
                    okText="Подтвердить"
                    onConfirm={() =>
                      handleManageUserRoles(record, role, hasRole)
                    }
                  >
                    <Button loading={isEditUserRolesLoading} size="small">
                      {hasRole
                        ? `Забрать ${ROLES_TEXT[role]}`
                        : `Дать ${ROLES_TEXT[role]}`}
                    </Button>
                  </Popconfirm>
                );
              })}
          </Flex>
        );
      },
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Flex className={styles.actions}>
          <Button
            onClick={() => handleGoToUserById(record.id)}
            className={styles.actionsButton}
            size="small"
          >
            Перейти к профилю
          </Button>
          {isAdmin && (
            <Popconfirm
              title="Вы действительно хотите удаль пользователя?"
              cancelText="Отмена"
              okText="Подтвердить"
              onConfirm={() => handleDeleteUser(record.id)}
            >
              <Button className={styles.actionsButton} size="small">
                Удалить
              </Button>
            </Popconfirm>
          )}
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

  const handleResetTable = () => {
    setSorter({});
    setIsBlocked(null);
    setSearchQuery(undefined);
    setCurrentPage(1);
  };

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  if (isError) {
    return (
      <Alert
        message="Ошибка загрузки пользователей. Перезагрузите страницу"
        type="error"
      />
    );
  }

  if (isLoading) {
    return (
      <Flex justify="center" style={{ marginBlockStart: "1rem" }}>
        <Spin />
      </Flex>
    );
  }

  const isUsersQueryEmpty =
    (!data || !data.data || !data.data.length) && !isFetching;

  return (
    <Flex vertical gap="0.4rem">
      <Flex gap="0.5rem">
        {showModalButton && (
          <Button className={styles.mobilePages} onClick={openModal}>
            <MenuUnfoldOutlined />
          </Button>
        )}

        <Modal
          title="Выберите страницу"
          open={isVisible}
          onCancel={closeModal}
          footer={null}
          maskClosable={true}
          destroyOnClose
        >
          <MenuPages />
        </Modal>

        <Input
          type="text"
          placeholder="Поиск"
          onChange={handleSearch}
          value={searchQuery}
          allowClear
        />
        <Button type="primary" color="primary" onClick={handleResetTable}>
          Сбросить всё
        </Button>
      </Flex>
      <Table<UserProfile>
        columns={userInfoColumns}
        dataSource={data?.data}
        rowKey="id"
        size="small"
        pagination={{
          current: currentPage,
          total: data?.meta.totalAmount,
          pageSize: 10,
        }}
        onChange={handleTableChange}
        loading={isFetching}
      />
      {isUsersQueryEmpty && <Alert message="Пользователей нет" type="info" />}
    </Flex>
  );
};
