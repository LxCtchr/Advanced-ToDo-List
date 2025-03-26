import { FormEvent, PropsWithChildren } from "react";
import { taskValidation } from "../../helpers";
import styles from "./Form.module.css";

interface FormProps {
  taskActionCallback: (title: string) => Promise<void>;
}

export const Form = ({ taskActionCallback, children }: PropsWithChildren<FormProps>) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const isValid = taskValidation(title);
    if (!isValid) {
      return false;
    }
    await taskActionCallback(title);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {children}
    </form>
  );
};
