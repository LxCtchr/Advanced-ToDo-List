import { Task, tasksApi, UpdatedTask } from "@/entities/Task";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, List, Typography } from "antd";
import { memo, MouseEvent, useState } from "react";
import { TasksForm } from "../../TasksForm/ui/TasksForm";
import styles from "./TaskItem.module.css";

const { Text } = Typography;

interface TaskItemProps {
  task: Task;
}

export const TaskItem = memo(({ task }: TaskItemProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);

  const [editTask] = tasksApi.useEditTaskMutation();
  const [deleteTask] = tasksApi.useDeleteTaskMutation();

  const handleCancelChangingTask = () => {
    setEditing(false);
  };

  const handleSaveTask = async (title: string) => {
    if (title === task.title) {
      setEditing(false);
      return;
    }

    await editTask({ id: task.id, title });
    setEditing(false);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };

  const handleChangeTaskIsDone = async (updatedTask: UpdatedTask) => {
    await editTask(updatedTask);
  };

  const handleEditTask = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditing(true);
  };

  return (
    <List.Item className={styles.task} style={{ padding: "0.625rem 1rem" }}>
      <Checkbox
        className={styles.checkbox}
        checked={task.isDone}
        onChange={() => handleChangeTaskIsDone({ id: task.id, isDone: !task.isDone })}
      />
      {isEditing ? (
        <>
          <TasksForm
            taskActionCallback={handleSaveTask}
            formId={`taskForm-${task.id}`}
            initialValue={task.title}
            autoFocus
          />
          <Flex className={styles.buttons}>
            <Button
              color="primary"
              variant="solid"
              htmlType="submit"
              form={`taskForm-${task.id}`}
              icon={<CheckOutlined />}
            />
            <Button color="danger" variant="solid" onClick={handleCancelChangingTask} icon={<CloseOutlined />} />
          </Flex>
        </>
      ) : (
        <>
          <Text className={`${styles.taskTitle} ${task.isDone ? styles.done : ""}`}>{task.title}</Text>
          <Flex className={styles.buttons}>
            <Button color="primary" variant="solid" onClick={handleEditTask} icon={<EditOutlined />} />
            <Button
              color="danger"
              variant="solid"
              onClick={() => handleDeleteTask(task.id)}
              icon={<DeleteOutlined />}
            />
          </Flex>
        </>
      )}
    </List.Item>
  );
});
