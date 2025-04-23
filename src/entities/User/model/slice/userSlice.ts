import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../types";

export interface UserState {
  currentUser: UserProfile | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
