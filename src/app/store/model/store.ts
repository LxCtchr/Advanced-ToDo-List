import { tasksApi } from "@/entities/Task";
import { userApi, userReducer } from "@/entities/User";
import { authReducer } from "@/features/Authorization";
import { authApi } from "@/features/Authorization/api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tasksApi.middleware, authApi.middleware, userApi.middleware);
  },
});
