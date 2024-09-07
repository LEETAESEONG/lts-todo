import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

const MyCalendar = () => {
  return (
    <div className="size-full">
      <Header theme="나의 일정" />
      <div className={`${ResponsivePadding} size-full`}></div>
    </div>
  );
};
export default MyCalendar;
