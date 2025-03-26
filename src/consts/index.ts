import { Filter, MetaResponse } from "../types";

export const BASE_URL = "https://easydev.club/api/v1";

export const DEFAULT_RESPONSE: MetaResponse = {
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
