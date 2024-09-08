import { Empty } from "antd";
import Header from "components/header";
import { useSelector } from "react-redux";
import { AllTodosState } from "store/all-todos-slice";
import { ResponsivePadding } from "styles/my-style";

const AllMyDones = () => {
  const allDones = Object.values(
    useSelector((state: AllTodosState) => state.allTodos.todos)
  ).filter((e) => e.isDone);
  return (
    <div className="size-full">
      <Header theme="완료된 일" />
      <div className={`${ResponsivePadding} size-full`}>
        {allDones.length === 0 ? (
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
export default AllMyDones;
