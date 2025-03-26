import { useState } from "react";
import { deleteTask, editTask } from "../api";
import { Task, UpdatedTask } from "../types";

interface UseTaskItemProps {
  updateTasks: () => Promise<void>;
  task: Task;
}

export const useTaskItem = ({ updateTasks, task }: UseTaskItemProps) => {
  const [taskEditingId, setEditingId] = useState<number | null>(null);

  const handleCancelChangingTask = () => {
    setEditingId(null);
  };

  const handleSaveTask = async (title: string) => {
    if (title === task.title) {
      setEditingId(null);
      return;
    }

    if (taskEditingId) {
      await editTask({ id: taskEditingId, title });
      await updateTasks();
      setEditingId(null);
    }
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    await updateTasks();
  };

  const handleChangeTaskIsDone = async (updatedTask: UpdatedTask) => {
    await editTask(updatedTask);
    await updateTasks();
  };

  return {
    taskEditingId,
    handleCancelChangingTask,
    handleDeleteTask,
    handleChangeTaskIsDone,
    handleSaveTask,
    setEditingId,
  };
};
