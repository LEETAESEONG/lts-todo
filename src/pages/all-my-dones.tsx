import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const AllMyDones = () => {
  return (
    <div className="size-full">
      <Header theme="완료된 일" />
      <div className={`${ResponsivePadding} size-full`}></div>
    </div>
  );
};
export default AllMyDones;
