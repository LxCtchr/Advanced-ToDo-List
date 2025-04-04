import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean;
}

const initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
