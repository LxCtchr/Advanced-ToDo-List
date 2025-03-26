import { createTask } from "../api";

interface UseAddTasksProps {
  updateTasks: () => Promise<void>;
}

export const useAddTasks = ({ updateTasks }: UseAddTasksProps) => {
  const handleCreateTask = async (title: string) => {
    await createTask(title);
    await updateTasks();
  };

  return { handleCreateTask };
};
