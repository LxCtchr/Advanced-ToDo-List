import { BASE_URL } from "@/shared/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthData, Token } from "./model/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  endpoints: (build) => ({
    login: build.mutation<Token, AuthData>({
      query: (authData) => ({
        url: "/signin",
        body: authData,
        method: "POST",
      }),
    }),
    refreshTokens: build.mutation<Token, string>({
      query: (refreshToken) => {
        return { url: `/refresh`, body: { refreshToken }, method: "POST" };
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshTokensMutation } = authApi;
