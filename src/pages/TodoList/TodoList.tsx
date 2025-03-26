import { AddTask, TaskItem, TasksFilters } from "../../components";
import { useTasksManager } from "../../hooks";
import styles from "./TodoList.module.css";

export const TodoList = () => {
  const { tasks, tasksInfo, filter, setFilter, updateTasks } = useTasksManager();

  return (
    <main>
      <div className={styles.wrapper}>
        <AddTask updateTasks={updateTasks} />
        <TasksFilters filter={filter} setFilter={setFilter} tasksInfo={tasksInfo} />
        <section>
          <ul className={styles.taskList}>
            {tasks && tasks.map((task) => <TaskItem key={task.id} task={task} updateTasks={updateTasks} />)}
          </ul>
        </section>
      </div>
    </main>
  );
};
