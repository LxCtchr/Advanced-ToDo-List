import { tasksApi, userApi, userReducer } from "@/entities";
import { adminApi, authApi, authReducer } from "@/features";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      tasksApi.middleware,
      authApi.middleware,
      userApi.middleware,
      adminApi.middleware
    );
  },
});
