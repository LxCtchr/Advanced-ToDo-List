import { MouseEvent, useState } from "react";
import { deleteTask, editTask } from "../../api";
import delete_icon from "../../assets/bin.svg";
import save_icon from "../../assets/check.svg";
import cancel_icon from "../../assets/cross.svg";
import edit_icon from "../../assets/pen.svg";
import { Task, UpdatedTask } from "../../types";
import { TasksForm } from "../TasksForm/TasksForm";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  updateTasks: () => Promise<void>;
  task: Task;
}

export const TaskItem = ({ task, updateTasks }: TaskItemProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);

  const handleCancelChangingTask = () => {
    setEditing(false);
  };

  const handleSaveTask = async (title: string) => {
    if (title === task.title) {
      setEditing(false);
      return;
    }

    await editTask({ id: task.id, title });
    await updateTasks();
    setEditing(false);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    await updateTasks();
  };

  const handleChangeTaskIsDone = async (updatedTask: UpdatedTask) => {
    await editTask(updatedTask);
    await updateTasks();
  };

  const handleEditTask = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditing(true);
  };

  return (
    <li className={styles.task}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={task.isDone}
        onChange={() => handleChangeTaskIsDone({ id: task.id, isDone: !task.isDone })}
      />
      {isEditing ? (
        <>
          <TasksForm
            taskActionCallback={handleSaveTask}
            formId={`taskForm-${task.id}`}
            defaultValue={task.title}
            autoFocus
          />
          <div className={styles.buttons}>
            <button type="submit" form={`taskForm-${task.id}`} className={`${styles.saveButton} ${styles.button}`}>
              <img className={styles.icon} src={save_icon} alt="Иконка сохранения" />
            </button>
            <button onClick={handleCancelChangingTask} className={`${styles.deleteButton} ${styles.button}`}>
              <img className={styles.icon} src={cancel_icon} alt="Иконка отмены" />
            </button>
          </div>
        </>
      ) : (
        <>
          <span className={`${styles.taskTitle} ${task.isDone ? styles.done : ""}`}>{task.title}</span>
          <div className={styles.buttons}>
            <button onClick={handleEditTask} className={`${styles.editButton} ${styles.button}`}>
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
