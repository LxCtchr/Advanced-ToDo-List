import { sessionReducer, tasksApi, userApi } from "@/entities";
import { adminApi, adminReducer, authApi, authReducer, registerApi } from "@/features";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    admin: adminReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      tasksApi.middleware,
      authApi.middleware,
      userApi.middleware,
      adminApi.middleware,
      registerApi.middleware
    );
  },
});
