import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodoType } from "./all-todos-slice";

interface DeleteDonesAction {
  deleteLists: number[];
}

interface CreateDonesAction {
  dones: TodoType[];
}

const allDonesSlice = createSlice({
  name: "allDones",
  initialState: {
    dones: [] as TodoType[],
  },
  reducers: {
    deleteDones(state, action: PayloadAction<DeleteDonesAction>) {
      state.dones = state.dones.filter((_, index) => {
        return !action.payload.deleteLists.includes(index);
      });
    },
    createTodo(state, action: PayloadAction<CreateDonesAction>) {
      state.dones = [...state.dones, ...action.payload.dones];
    },
    deleteAll(state) {
      state.dones = [];
    },
  },
});
export const allDonesActions = allDonesSlice.actions;
export default allDonesSlice;
