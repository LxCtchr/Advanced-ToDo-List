import { BASE_URL } from "@/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Filter, MetaResponse, Task, TaskInfo, UpdatedTask } from "./model/types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["tasks"],
  endpoints: (build) => ({
    getTasks: build.query<MetaResponse<Task, TaskInfo>, Filter>({
      query: (filter) => ({
        url: "/todos",
        params: { filter },
        method: "GET",
      }),
      providesTags: () => ["tasks"],
    }),
    createTask: build.mutation<void, string>({
      query: (title) => ({
        url: "/todos",
        body: { title, isDone: false },
        method: "POST",
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: build.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
    editTask: build.mutation<void, UpdatedTask>({
      query: ({ id, isDone, title }) => ({
        url: `/todos/${id}`,
        body: { title, isDone },
        method: "PUT",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation } = tasksApi;
