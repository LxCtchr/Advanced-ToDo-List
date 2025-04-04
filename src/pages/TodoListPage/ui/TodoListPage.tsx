import { Filter, selectTasks, useCreateTaskMutation, useGetTasksQuery } from "@/entities/Task";
import { AddTask, TaskItem, TasksFilters } from "@/features/Tasks";
import { useNotification } from "@/shared/hooks/notificationHooks";
import { List } from "antd";
import { useCallback, useMemo, useState } from "react";

export const TodoListPage = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const notification = useNotification();

  const { data: tasksData } = useGetTasksQuery(filter, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
    selectFromResult: selectTasks,
  });

  const [createTask] = useCreateTaskMutation();

  const handleCreateTask = useCallback(
    async (title: string) => {
      try {
        await createTask(title).unwrap();
      } catch {
        notification.error({
          message: "Ошибка",
          description: "Произошла ошибка при создании задачи. Попробуйте позже",
        });
      }
    },
    [createTask, notification]
  );

  const memoizedTasks = useMemo(() => tasksData?.data, [tasksData?.data]);

  if (!tasksData) {
    return null;
  }

  return (
    <>
      <AddTask handleCreateTask={handleCreateTask} />
      <TasksFilters filter={filter} setFilter={setFilter} tasksInfo={tasksData.info} />
      <List dataSource={memoizedTasks} renderItem={(task) => <TaskItem task={task} />} rowKey={(task) => task.id} />
    </>
  );
};
