import { List } from "antd";
import { useCallback, useEffect, useState } from "react";
import { getTasks } from "../../api";
import { AddTask, TaskItem, TasksFilters } from "../../components";
import { DEFAULT_RESPONSE } from "../../constants";
import { Filter, MetaResponse, Task, TaskInfo } from "../../types";

export const TodoListPage = () => {
  const [metaData, setMetaData] = useState<MetaResponse<Task, TaskInfo>>(DEFAULT_RESPONSE);
  const [filter, setFilter] = useState<Filter>("all");

  const updateTasks = useCallback(async () => {
    const newMetaData = await getTasks(filter);

    if (newMetaData) {
      setMetaData(newMetaData);
    }
  }, [filter]);

  useEffect(() => {
    updateTasks();

    const interval = setInterval(updateTasks, 5000);

    return () => clearInterval(interval);
  }, [updateTasks]);

  const { data: tasks, info: tasksInfo } = metaData;

  return (
    <>
      <AddTask updateTasks={updateTasks} />
      <TasksFilters filter={filter} setFilter={setFilter} tasksInfo={tasksInfo} />
      <List
        dataSource={tasks}
        renderItem={(task) => <TaskItem task={task} updateTasks={updateTasks} />}
        rowKey={(task) => task.id}
      />
    </>
  );
};
