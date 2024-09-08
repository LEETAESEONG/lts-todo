import { Empty } from "antd";
import Header from "components/header";
import { useSelector } from "react-redux";
import { AllTodosState } from "store/all-todos-slice";
import { ResponsivePadding } from "styles/my-style";

const AllMyTodos = () => {
  const allTodos = Object.values(
    useSelector((state: AllTodosState) => state.allTodos.todos)
  ).filter((e) => e.isDone === false);
  return (
    <div className="size-full">
      <Header theme="해야 할 일" />
      <div className={`${ResponsivePadding} size-full`}>
        {allTodos.length === 0 ? (
          <>
            <Empty />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default AllMyTodos;
