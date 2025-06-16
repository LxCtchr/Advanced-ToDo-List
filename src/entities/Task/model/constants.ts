import { Filter } from "./types";

export const FILTERS: Record<Filter, string> = {
  all: "Все",
  inWork: "В работе",
  completed: "Сделано",
};

export const MIN_CHARACTERS = 2;
export const MAX_CHARACTERS = 64;
export const LENGTH_VALIDATION_MESSAGE = "Название задачи может быть от 2 до 64 символов в длину";
