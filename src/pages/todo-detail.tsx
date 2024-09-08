import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const TodoDetail = () => {
  return (
    <div className="size-full">
      <Header theme="상세 일정" />
      <div className={`${ResponsivePadding} size-full`}></div>
    </div>
  );
};
export default TodoDetail;
