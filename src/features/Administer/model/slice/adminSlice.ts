import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  isAdmin: boolean;
  isModerator: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
  isModerator: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setIsModerator(state, action: PayloadAction<boolean>) {
      state.isModerator = action.payload;
    },
  },
});

export const { setIsAdmin, setIsModerator } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
