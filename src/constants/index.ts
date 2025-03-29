import { Filter, MetaResponse, Task, TaskInfo } from "../types";

export const BASE_URL = "https://easydev.club/api/v1";

export const DEFAULT_RESPONSE: MetaResponse<Task, TaskInfo> = {
  data: [],
  info: {
    all: 0,
    completed: 0,
    inWork: 0,
  },
  meta: {
    totalAmount: 0,
  },
};

export const FILTERS: Record<Filter, string> = {
  all: "Все",
  inWork: "В работе",
  completed: "Сделано",
};

export const MIN_CHARACTERS = 2;
export const MAX_CHARACTERS = 64;
