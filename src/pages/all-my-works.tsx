import { Empty, Timeline } from "antd";
import { useSelector } from "react-redux";
import { AllTodosState, TodoType } from "store/all-todos-slice";
import Header from "components/header";
import { ResponsivePadding, myColors } from "styles/my-style";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const AllMyWorks = () => {
  const navigate = useNavigate();
  const today = dayjs().startOf("day"); // 오늘 날짜를 기준으로 필터링 (날짜만 비교)
  const allTodos = Object.values(
    useSelector((state: AllTodosState) => state.allTodos.todos)
  )
    .filter(
      (todo: TodoType) =>
        dayjs(todo.startDate).isSame(today, "day") ||
        dayjs(todo.startDate).isAfter(today)
    ) // 오늘 포함 이후 날짜 필터링
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    ); // 날짜 정렬
  return (
    <div className="size-full">
      <Header theme="일정 보기" />
      <div className={`${ResponsivePadding} size-full`}>
        {allTodos.length === 0 ? (
          <>
            <Empty />
          </>
        ) : (
          <>
            <Timeline
              mode="left"
              // label 이랑 children
              items={allTodos.map((e: TodoType) => {
                return {
                  label: (
                    <p>
                      <span className="font-black">{e.startDate}</span>
                      <span> ~ </span>
                      {e.endDate}
                    </p>
                  ),
                  color: myColors[e.rate],
                  children: (
                    <div>
                      <p
                        className="cursor-pointer size-fit"
                        onClick={() => navigate(`/todo/${e.id}`)}
                      >
                        {e.title}
                      </p>
                    </div>
                  ),
                };
              })}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default AllMyWorks;
