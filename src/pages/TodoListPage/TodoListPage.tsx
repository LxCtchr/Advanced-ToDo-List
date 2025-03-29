import { useCallback, useEffect, useState } from "react";
import { getTasks } from "../../api";
import { AddTask, TaskItem, TasksFilters } from "../../components";
import { DEFAULT_RESPONSE } from "../../constants";
import { Filter, MetaResponse, Task, TaskInfo } from "../../types";
import styles from "./TodoListPage.module.css";

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
  }, [updateTasks]);

  const { data: tasks, info: tasksInfo } = metaData;

  return (
    <main>
      <div className={styles.wrapper}>
        <AddTask updateTasks={updateTasks} />
        <TasksFilters filter={filter} setFilter={setFilter} tasksInfo={tasksInfo} />
        <section>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} updateTasks={updateTasks} />
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};
