import { BASE_URL } from "../constants";
import { Filter, MetaResponse, Task, TaskInfo, UpdatedTask } from "../types";

export const getTasks = async (filter: Filter): Promise<MetaResponse<Task, TaskInfo> | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/todos?filter=${filter}`, { method: "GET" });

    if (!response.ok) {
      throw new Error("Ошибка при получении задач");
    }

    const metaData: MetaResponse<Task, TaskInfo> = await response.json();

    return metaData;
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (title: string) => {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({ title, isDone: false }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при создании задачи");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении задачи");
    }
  } catch (error) {
    console.error(error);
  }
};

export const editTask = async ({ id, title, isDone }: UpdatedTask) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, isDone }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при сохранении задачи");
    }
  } catch (error) {
    console.error(error);
  }
};
