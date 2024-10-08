import { configureStore } from "@reduxjs/toolkit";
import allTodosSlice from "./all-todos-slice";

const store = configureStore({
  reducer: {
    allTodos: allTodosSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
