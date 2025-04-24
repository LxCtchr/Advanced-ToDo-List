import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  isAdmin: boolean;
}

const initialState: AdminState = {
  isAdmin: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
