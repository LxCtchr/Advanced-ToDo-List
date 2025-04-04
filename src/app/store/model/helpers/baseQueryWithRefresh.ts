import { sessionService } from "@/entities/Session";
import { setUser } from "@/entities/User";
import { authApi, setIsAuth } from "@/features/Authorization";
import { BASE_URL, defineError } from "@/shared";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = sessionService.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  const currentRefreshToken = localStorage.getItem("refreshToken");

  if (!currentRefreshToken) {
    sessionService.clearTokens();
    api.dispatch(setIsAuth(false));
    api.dispatch(setUser(null));
    window.location.reload();

    return result;
  }

  if (defineError(result.error) && result.error.originalStatus === 401) {
    try {
      const refreshTokens = authApi.endpoints.refreshTokens.initiate(currentRefreshToken);
      const newTokens = await api.dispatch(refreshTokens).unwrap();

      if (newTokens) {
        sessionService.accessToken = newTokens.accessToken;
        localStorage.setItem("refreshToken", newTokens.refreshToken);
      }
    } catch {
      sessionService.clearTokens();
      api.dispatch(setIsAuth(false));
      api.dispatch(setUser(null));
      window.location.reload();
      return result;
    }

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
