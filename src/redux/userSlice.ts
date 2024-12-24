import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { user } from "../types/users";

interface UserState {
  user: user | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
