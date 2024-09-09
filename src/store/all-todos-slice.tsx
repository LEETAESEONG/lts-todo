import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// type
export type TodoType = {
  id?: number; // id
  title: string; // 제목
  rate: number; // 중요도
  time: string; // 시간제한
  content: string; // 내용
  startDate: string; // 시작 날짜
  endDate: string; // 끝 날짜
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
  todoIds: number[];
}
interface ValueUpdateAction {
  todo: TodoType;
  todoId: number;
}

// state
export interface AllTodosState {
  allTodos: {
    todos: { [key: number]: TodoType };
    currentId: 0;
    noUses: number[];
  };
}

const allTodosSlice = createSlice({
  name: "allTodos",
  initialState: {
    todos: {} as { [key: number]: TodoType }, // 숫자 인덱스를 가진 객체로 정의
    currentId: 0,
    noUses: [] as number[],
  },
  reducers: {
    deleteTodos(state, action: PayloadAction<DeleteTodosAction>) {
      action.payload.deleteLists.forEach((todoId) => {
        delete state.todos[todoId];
        state.noUses.push(todoId);
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
    updateTodos(state, action: PayloadAction<UpdateTodoAction>) {
      const todoIds = action.payload.todoIds;
      todoIds.forEach((e) => {
        state.todos[e].isDone = !state.todos[e].isDone;
      });
    },
    valueUpdate(state, action: PayloadAction<ValueUpdateAction>) {
      const { todoId, todo } = action.payload;
      state.todos[todoId] = todo;
    },
  },
});
export const allTodosActions = allTodosSlice.actions;
export default allTodosSlice;
