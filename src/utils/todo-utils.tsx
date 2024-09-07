// 임의로 몇 개 추가할 건지 물어보고 만들어주는 함수
import { allTodosActions } from "store/all-todos-slice";
import store from "store/index";
export const addTodos = () => {
  const numberOfTodos = prompt("몇 개의 할 일을 추가하시겠습니까?", "1");
  const count = Number(numberOfTodos);
  if (isNaN(count) || count <= 0) {
    alert("유효한 숫자를 입력해주세요.");
    return;
  }
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  for (let i = 0; i < count; i++) {
    const todo = {
      title: `Task ${i + 1}`,
      rate: Math.floor(Math.random() * 5) + 1,
      time: formatTime(new Date()), // 12:00:00 형식
      content: `Content for Task ${i + 1}`,
      startDate: formatDate(new Date()), // 2019-10-10 형식
      endDate: formatDate(new Date(Date.now() + 86400000)), // 하루 뒤 날짜, 2019-10-10 형식
    };

    // Dispatch the createTodo action with the new todo
    store.dispatch(
      allTodosActions.createTodo({
        todo,
      })
    );
  }
};
