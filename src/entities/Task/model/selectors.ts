import { createSelector } from "@reduxjs/toolkit/react";
import { MetaResponse, Task, TaskInfo } from "./types";

export const selectTasks = createSelector(
  (result: { data?: MetaResponse<Task, TaskInfo> }) => result,
  (result) => ({ data: result.data })
);
