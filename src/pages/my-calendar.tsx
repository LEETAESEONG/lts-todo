import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";

// antd
import type { CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useSelector } from "react-redux";
import { AllTodosState, TodoType } from "store/all-todos-slice";
// icon
import { CalendarOutlined } from "@ant-design/icons";
import { myColors } from "styles/my-style";
import { useNavigate } from "react-router-dom";

type ListDataType = {
  type: string;
  content: string;
  id?: number;
  rate: number;
  isDone?: Boolean;
};

const getListData = (value: Dayjs, allTodos: TodoType[]) => {
  let listData: ListDataType[] = [];

  // value가 "Fri, 11 Oct 2024 16:34:28 GMT" 형식으로 들어올 때,
  // startDate도 동일한 형식의 문자열로 가정하고, 이를 Dayjs 객체로 변환
  let newData = allTodos.filter((e) => dayjs(e.startDate).isSame(value, "day"));

  // 필터링된 할 일 목록을 listData로 변환
  newData.forEach((todo) => {
    listData.push({
      type: todo.isDone ? "success" : "warning",
      content: todo.title,
      id: todo.id,
      rate: todo.rate,
      isDone: todo.isDone,
    });
  });

  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  // 각 달마다 할 일 개수
  if (value.month() === 8) {
    return 1394;
  }
};

// MyCalendar Page
const MyCalendar = () => {
  const navigate = useNavigate();
  const allTodos = Object.values(
    useSelector((state: AllTodosState) => state.allTodos.todos)
  );

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, allTodos);
    return (
      <>
        <ul className="events phone:hidden tablet:block">
          {listData.map((item) => (
            // 클릭했을 때 detail page로 이동
            <li
              key={item.id}
              onClick={() => {
                navigate(`/todo/${item.id}`);
              }}
            >
              <Badge
                color={item.isDone ? myColors[0] : myColors[item.rate]}
                text={item.content}
              />
            </li>
          ))}
        </ul>
        {listData.length > 0 ? (
          <div className="phone:block tablet:hidden size-full flex justify-end items-center">
            <div className="w-full h-1/2 flex items-center justify-center">
              <Badge color="#800080" count={listData.length} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  // 보여지는 곳
  return (
    <div className="size-full">
      <Header theme="나의 일정" icon={<CalendarOutlined />} />
      <div className={`${ResponsivePadding} size-full`}>
        <Calendar cellRender={cellRender} />
      </div>
    </div>
  );
};
export default MyCalendar;
