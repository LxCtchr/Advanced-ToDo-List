import { FormEvent } from "react";
import { taskValidation } from "../../helpers";
import styles from "./TasksForm.module.css";

interface FormProps {
  taskActionCallback: (title: string) => Promise<void>;
  defaultValue?: string;
  autoFocus?: boolean;
  formId: string;
}

export const TasksForm = ({ taskActionCallback, formId, defaultValue, autoFocus }: FormProps) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const taskTitle = formData.get("taskTitle") as string;
    const isValid = taskValidation(taskTitle);
    if (!isValid) {
      return false;
    }
    await taskActionCallback(taskTitle);
    form.reset();
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="taskTitle"
        className={`${styles.editTaskTitle} ${styles.taskTitle}`}
        placeholder="Напишите задачу"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
      />
    </form>
  );
};
