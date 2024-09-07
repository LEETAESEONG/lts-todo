import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const TodoDetail = () => {
  return (
    <div className="size-full">
      <Header theme="Create Todo" />
      <div className={`${ResponsivePadding} size-full`}></div>
    </div>
  );
};
export default TodoDetail;
