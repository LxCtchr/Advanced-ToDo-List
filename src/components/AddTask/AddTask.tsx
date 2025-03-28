import { Button, Flex } from "antd";
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
    <Flex>
      <TasksForm taskActionCallback={handleCreateTask} formId="taskForm" />
      <Button color="primary" variant="solid" htmlType="submit" form="taskForm" className={styles.button}>
        Добавить
      </Button>
    </Flex>
  );
});
