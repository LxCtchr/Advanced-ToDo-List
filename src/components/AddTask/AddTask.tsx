import { memo } from "react";
import { createTask } from "../../api";
import { TasksForm } from "../TasksForm/TasksForm";
import styles from "./AddTask.module.css";

interface AddTaskProps {
  updateTasks: () => Promise<void>;
}

export const AddTask = memo(({ updateTasks }: AddTaskProps) => {
  const handleCreateTask = async (title: string) => {
    await createTask(title);
    await updateTasks();
  };

  return (
    <section className={styles.addTaskForm}>
      <TasksForm taskActionCallback={handleCreateTask} formId="taskForm" />
      <button type="submit" form="taskForm" className={styles.button}>
        Добавить
      </button>
    </section>
  );
});
