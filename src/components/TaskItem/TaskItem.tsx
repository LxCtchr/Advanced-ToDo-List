import delete_icon from "../../assets/bin.svg";
import save_icon from "../../assets/check.svg";
import cancel_icon from "../../assets/cross.svg";
import edit_icon from "../../assets/pen.svg";
import { useTaskItem } from "../../hooks";
import { Task } from "../../types";
import { Form } from "../Form/Form";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  updateTasks: () => Promise<void>;
  task: Task;
}

export const TaskItem = ({ task, updateTasks }: TaskItemProps) => {
  const {
    taskEditingId,
    handleChangeTaskIsDone,
    handleSaveTask,
    handleCancelChangingTask,
    setEditingId,
    handleDeleteTask,
  } = useTaskItem({
    updateTasks,
    task,
  });

  return (
    <li className={styles.task}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={task.isDone}
        onChange={() => handleChangeTaskIsDone({ id: task.id, isDone: !task.isDone })}
      />
      {taskEditingId === task.id ? (
        <Form taskActionCallback={handleSaveTask}>
          <input
            type="text"
            name="title"
            defaultValue={task.title}
            className={`${styles.editTaskTitle} ${styles.taskTitle} `}
            autoFocus
          />
          <div className={styles.buttons}>
            <button type="submit" className={`${styles.saveButton} ${styles.button}`}>
              <img className={styles.icon} src={save_icon} alt="Иконка сохранения" />
            </button>
            <button onClick={handleCancelChangingTask} className={`${styles.deleteButton} ${styles.button}`}>
              <img className={styles.icon} src={cancel_icon} alt="Иконка отмены" />
            </button>
          </div>
        </Form>
      ) : (
        <>
          <span className={`${styles.taskTitle} ${task.isDone ? styles.done : ""}`}>{task.title}</span>
          <div className={styles.buttons}>
            <button onClick={() => setEditingId(task.id)} className={`${styles.editButton} ${styles.button}`}>
              <img className={styles.icon} src={edit_icon} alt="Иконка редактирования" />
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className={`${styles.deleteButton} ${styles.button}`}>
              <img className={styles.icon} src={delete_icon} alt="Иконка удаления" />
            </button>
          </div>
        </>
      )}
    </li>
  );
};
