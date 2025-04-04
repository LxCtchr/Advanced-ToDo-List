import { Button, Flex } from "antd";
import { memo } from "react";
import { TasksForm } from "../../TasksForm/ui/TasksForm";
import styles from "./AddTask.module.css";

interface AddTaskProps {
  handleCreateTask: (title: string) => Promise<void>;
}

export const AddTask = memo(({ handleCreateTask }: AddTaskProps) => {
  return (
    <Flex>
      <TasksForm taskActionCallback={handleCreateTask} formId="taskForm" />
      <Button color="primary" variant="solid" htmlType="submit" form="taskForm" className={styles.button}>
        Добавить
      </Button>
    </Flex>
  );
});
