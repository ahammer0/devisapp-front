import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { user } from "../types/users";

interface UserState {
  user: user | null;
  role: "user" | "admin" | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  role: null,
  token: null,
};

interface userPayload {
  user: user;
  role: "admin" | "user";
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userPayload>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
      state.role = initialState.role;
      state.token = initialState.token;
    },
  },
});

export const { setUser, resetUser, setToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserRole = (state: RootState) => state.user.role;

export default userSlice.reducer;
