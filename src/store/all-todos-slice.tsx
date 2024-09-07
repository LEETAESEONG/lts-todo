import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface DeleteTodosAction {
  deleteLists: number[];
}

export type TodoType = {
  title: string; // 제목
  rate: number; // 중요도
  time: string; // 시간제한
  content: string; // 내용
  startDate: string; // 시작 날짜
  endDate: string; // 끝 날짜
  upload?: FileType; // 이미지 업로드
};

interface CreateTodoAction {
  todo: TodoType;
}

export interface AllTodosState {
  allTodos: {
    todos: TodoType[];
  };
}

const allTodosSlice = createSlice({
  name: "allTodos",
  initialState: {
    todos: [] as TodoType[],
  },
  reducers: {
    deleteTodos(state, action: PayloadAction<DeleteTodosAction>) {
      state.todos = state.todos.filter((_, index) => {
        return !action.payload.deleteLists.includes(index);
      });
    },
    createTodo(state, action: PayloadAction<CreateTodoAction>) {
      state.todos.push(action.payload.todo);
    },
    deleteAll(state) {
      state.todos = [];
    },
  },
});
export const allTodosActions = allTodosSlice.actions;
export default allTodosSlice;
