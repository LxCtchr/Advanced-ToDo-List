import { baseQueryWithRefresh } from "@/app/store/model/helpers/baseQueryWithRefresh";
import type { UserProfile } from "@/entities";
import { createApi } from "@reduxjs/toolkit/query/react";
import { MetaResponse } from "./model/types";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithRefresh,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: BASE_URL + "/admin",
  //   prepareHeaders: (headers) => {
  //     const token = sessionService.accessToken;
  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  tagTypes: ["administerUsers"],
  endpoints: (build) => ({
    getUsers: build.query<MetaResponse<UserProfile>, void>({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: () => ["administerUsers"],
    }),
    getUserById: build.query<UserProfile, unknown>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["administerUsers"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useLazyGetUserByIdQuery, useDeleteUserMutation } = adminApi;
