// 임의로 몇 개 추가할 건지 물어보고 만들어주는 함수
import { allTodosActions, TodoType } from "store/all-todos-slice";
import store from "store/index";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const addTodos = () => {
  const numberOfTodos = prompt("몇 개의 할 일을 추가하시겠습니까?", "1");
  const count = Number(numberOfTodos);

  if (isNaN(count) || count <= 0) {
    alert("유효한 숫자를 입력해주세요.");
    return;
  }

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getRandomDate = () => {
    const today = new Date();

    // 이번 달의 마지막 날짜
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    // 첫 번째 날과 마지막 날 사이의 차이 (일 수)
    const daysInMonth = lastDayOfMonth.getDate();

    // 1 ~ daysInMonth 사이의 랜덤한 숫자를 선택
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

    // 이번 달의 랜덤한 날짜 생성
    const randomDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      randomDay
    );

    return randomDate;
  };

  const getRandomBoolean = () => {
    return Math.random() < 0.5; // 50% 확률로 true 또는 false 반환
  };

  for (let i = 0; i < count; i++) {
    const randomStartDate = getRandomDate();
    const randomEndDate = new Date(randomStartDate.getTime() + 86400000); // 하루 뒤 날짜

    const todo = {
      title: `Task ${i + 1}`,
      rate: Math.floor(Math.random() * 5) + 1,
      time: formatTime(new Date()), // 12:00:00 형식
      content: `Content for Task ${i + 1}`,
      startDate: formatDate(randomStartDate), // 랜덤 시작 날짜
      endDate: formatDate(randomEndDate), // 랜덤 끝나는 날짜
      isDone: getRandomBoolean(),
    };

    // Dispatch the createTodo action with the new todo
    store.dispatch(allTodosActions.createTodo({ todo }));
  }
};

export const addOneTodo = (todo: TodoType) => {
  // 여기서 모달 띄우고
  // 수락 누르면 생성
  store.dispatch(allTodosActions.createTodo({ todo }));
};

export const upDateTodo = (todoId: number, todo: TodoType) => {
  // 수정할지 모달 띄우고
  // 수락 누르면 수정
};
