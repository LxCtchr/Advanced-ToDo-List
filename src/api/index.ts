import { Filter, MetaResponse, Task, TaskInfo, UpdatedTask } from "../types";
import { defaultInstance } from "./axios";

export const getTasks = async (filter: Filter): Promise<MetaResponse<Task, TaskInfo> | undefined> => {
  try {
    const response = await defaultInstance.get<MetaResponse<Task, TaskInfo>>("/todos", {
      params: { filter },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (title: string) => {
  try {
    await defaultInstance.post("/todos", { title, isDone: false });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    await defaultInstance.delete(`/todos/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const editTask = async ({ id, title, isDone }: UpdatedTask) => {
  try {
    await defaultInstance.put(`/todos/${id}`, { title, isDone });
  } catch (error) {
    console.error(error);
  }
};
