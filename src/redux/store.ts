import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./quotesSlice";
import userReducer from "./userSlice";
import worksReducer from "./worksSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quotes: quotesReducer,
    works: worksReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
