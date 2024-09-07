import { Timeline } from "antd";
import { useSelector } from "react-redux";
import { AllTodosState, TodoType } from "store/all-todos-slice";
import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const AllMyWorks = () => {
  const allTodos = useSelector((state: AllTodosState) => state.allTodos.todos);
  return (
    <div className="size-full">
      <Header theme="전체 보기" />
      <div className={`${ResponsivePadding} size-full`}>
        <Timeline
          mode="left"
          // label 이랑 children
          items={allTodos.map((e: TodoType) => {
            return {
              label: e.startDate,
              children: e.title,
            };
          })}
        />
      </div>
    </div>
  );
};
export default AllMyWorks;
