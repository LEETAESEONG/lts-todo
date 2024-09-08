import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetProp, UploadProps } from "antd";

// type
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export type TodoType = {
  id?: number; // id
  title: string; // 제목
  rate: number; // 중요도
  time: string; // 시간제한
  content: string; // 내용
  startDate: string; // 시작 날짜
  endDate: string; // 끝 날짜
  upload?: FileType; // 이미지 업로드
  isDone: Boolean;
};

// interface
interface DeleteTodosAction {
  deleteLists: number[];
}
interface CreateTodoAction {
  todo: TodoType;
}
interface UpdateTodoAction {
  todo: TodoType;
  todoId: number;
}

// state
export interface AllTodosState {
  allTodos: {
    todos: TodoType[];
    currentId: 0;
    removeIds: number[];
    noUses: number[];
  };
}

const allTodosSlice = createSlice({
  name: "allTodos",
  initialState: {
    todos: {} as { [key: number]: TodoType }, // 숫자 인덱스를 가진 객체로 정의
    currentId: 0,
    removeIds: [],
    noUses: [],
  },
  reducers: {
    deleteTodos(state, action: PayloadAction<DeleteTodosAction>) {
      action.payload.deleteLists.forEach((todoId) => {
        delete state.todos[todoId];
      });
    },
    createTodo(state, action: PayloadAction<CreateTodoAction>) {
      let newId = state.currentId;
      if (state.noUses.length <= 0) {
        state.currentId++;
      } else {
        const unusedId = state.noUses.shift();
        if (unusedId !== undefined) {
          newId = unusedId;
        }
      }
      const newTodo = {
        ...action.payload.todo,
        id: newId,
      };
      state.todos[newId] = newTodo;
    },
    deleteAll(state) {
      state.todos = {};
    },
    updateTodo(state, action: PayloadAction<UpdateTodoAction>) {
      const { todoId, todo } = action.payload;
      if (state.todos[todoId]) {
        state.todos[todoId] = todo; // 객체에서 특정 todo 업데이트
      }
    },
  },
});
export const allTodosActions = allTodosSlice.actions;
export default allTodosSlice;
