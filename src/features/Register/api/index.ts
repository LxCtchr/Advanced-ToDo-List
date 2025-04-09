import { UserProfile } from "@/entities";
import { BASE_URL } from "@/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegistrationData } from "../model/types";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/auth` }),
  endpoints: (build) => ({
    register: build.mutation<UserProfile, RegistrationData>({
      query: (registrationData) => ({
        url: "/signup",
        body: registrationData,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
