import { baseQueryWithRefresh } from "@/app/store/model/helpers/baseQueryWithRefresh";
import type { UserProfile } from "@/entities";
import { createApi } from "@reduxjs/toolkit/query/react";
import { MetaResponse, UserFilters, UserRequest, UserRolesRequest } from "./model/types";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["administerUsers"],
  endpoints: (build) => ({
    getUsers: build.query<MetaResponse<UserProfile>, UserFilters>({
      query: (filters) => ({
        url: "/admin/users",
        method: "GET",
        params: filters,
      }),
      providesTags: () => ["administerUsers"],
    }),
    getUserById: build.query<UserProfile, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      providesTags: () => ["administerUsers"],
    }),
    deleteUser: build.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["administerUsers"],
    }),
    editUser: build.mutation<UserProfile, { id: string; userData: UserRequest }>({
      query: ({ id, userData }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["administerUsers"],
    }),
    editUserRights: build.mutation<void, { id: number; roles: UserRolesRequest }>({
      query: ({ id, roles }) => ({
        url: `/admin/users/${id}/rights`,
        method: "POST",
        body: roles,
      }),
      invalidatesTags: ["administerUsers"],
    }),
    blockUser: build.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/${id}/block`,
        method: "POST",
      }),
      invalidatesTags: ["administerUsers"],
    }),
    unblockUser: build.mutation<void, number>({
      query: (id) => ({
        url: `/admin/users/${id}/unblock`,
        method: "POST",
      }),
      invalidatesTags: ["administerUsers"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useEditUserRightsMutation,
} = adminApi;
