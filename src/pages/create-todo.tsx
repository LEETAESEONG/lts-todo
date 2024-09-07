import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const CreateTodo = () => {
  return (
    <div className="size-full">
      <Header theme="할 일 생성하기" />
      <div className={`${ResponsivePadding} size-full`}></div>
    </div>
  );
};
export default CreateTodo;
