import { baseQueryWithRefresh } from "@/app/store/model/helpers/baseQueryWithRefresh";
import { createApi } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "./model/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (build) => ({
    getUserProfile: build.query<UserProfile, void>({
      query: () => ({ url: "/user/profile", method: "GET" }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: "/user/logout", method: "POST" }),
    }),
  }),
});

export const { useGetUserProfileQuery, useLazyGetUserProfileQuery, useLogoutMutation } = userApi;
