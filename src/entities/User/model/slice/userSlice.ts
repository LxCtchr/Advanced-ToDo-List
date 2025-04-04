import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../types";

export interface UserState {
  User: UserProfile | null;
}

const initialState: UserState = {
  User: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile | null>) {
      state.User = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
