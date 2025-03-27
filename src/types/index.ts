export interface Task {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TaskInfo {
  all: number;
  completed: number;
  inWork: number;
}

export type Filter = keyof TaskInfo;

export interface MetaResponse<T, N> {
  data: T[];
  info: N;
  meta: {
    totalAmount: number;
  };
}

export type UpdatedTask = Pick<Task, "id"> & Partial<Pick<Task, "title" | "isDone">>;
