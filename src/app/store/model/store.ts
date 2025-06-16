import { sessionReducer, userApi } from "@/entities/Session";
import { tasksApi } from "@/entities/Task";
import { adminApi, adminReducer } from "@/features/Administer";
import { authApi, authReducer } from "@/features/Authorize";
import { registerApi } from "@/features/Register";
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
