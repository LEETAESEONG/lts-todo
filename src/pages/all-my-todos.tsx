import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const AllMyTodos = () => {
  return (
    <div className="size-full">
      <Header theme="해야 할 일" />
      <div className={`${ResponsivePadding} size-full`}></div>
    </div>
  );
};
export default AllMyTodos;
