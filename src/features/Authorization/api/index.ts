import { UserProfile } from "@/entities/User";
import { BASE_URL } from "@/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthData, RegistrationData, Token } from "../model";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  endpoints: (build) => ({
    register: build.mutation<UserProfile, RegistrationData>({
      query: (registrationData) => ({
        url: "/signup",
        body: registrationData,
        method: "POST",
      }),
    }),
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

export const { useLoginMutation, useRefreshTokensMutation, useRegisterMutation } = authApi;
