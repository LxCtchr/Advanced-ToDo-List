import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { taskValidationRules } from "../../helpers";
import styles from "./TasksForm.module.css";

interface FormProps {
  taskActionCallback: (title: string) => Promise<void>;
  initialValue?: string;
  autoFocus?: boolean;
  formId: string;
}

export const TasksForm = ({ taskActionCallback, formId, initialValue, autoFocus }: FormProps) => {
  const [form] = useForm();

  const handleSubmit = async (values: { taskTitle: string }) => {
    await taskActionCallback(values.taskTitle);
    form.resetFields();
  };

  return (
    <Form
      id={formId}
      form={form}
      initialValues={{ taskTitle: initialValue }}
      onFinish={handleSubmit}
      autoComplete="off"
      className={styles.form}
    >
      <Form.Item name="taskTitle" rules={taskValidationRules} className={styles.taskTitle}>
        <Input
          type="text"
          placeholder="Напишите задачу"
          autoFocus={autoFocus}
          className={styles.editTaskTitle}
          style={{
            boxShadow: "none",
            backgroundColor: "inherit",
          }}
        />
      </Form.Item>
    </Form>
  );
};
