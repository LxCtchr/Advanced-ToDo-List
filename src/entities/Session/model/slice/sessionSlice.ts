import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../../User/model/types";

export interface UserState {
  currentUser: UserProfile | null;
  isAuth: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isAuth: false,
};

export const sessionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile | null>) {
      state.currentUser = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setIsAuth } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
