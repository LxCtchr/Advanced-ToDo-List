import { useAddTasks } from "../../hooks";
import { Form } from "../Form/Form";
import styles from "./AddTask.module.css";

interface AddTaskProps {
  updateTasks: () => Promise<void>;
}

export const AddTask = ({ updateTasks }: AddTaskProps) => {
  const { handleCreateTask } = useAddTasks({ updateTasks });

  return (
    <section className={styles.addTaskForm}>
      <Form taskActionCallback={handleCreateTask}>
        <input
          type="text"
          name="title"
          className={`${styles.editTaskTitle} ${styles.taskTitle}`}
          placeholder="Напишите задачу"
        />
        <button type="submit" className={styles.button}>
          Добавить
        </button>
      </Form>
    </section>
  );
};
