// react-router-dom
import { Outlet, useNavigate } from "react-router-dom";

// icons
import {
  SmileFilled,
  FileAddOutlined,
  HomeOutlined,
  CheckOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// components
import { FloatButton } from "antd";

// utils
import { addTodos } from "utils/todo-utils";
import Footer from "components/Footer";

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-screen">
      <div className="size-full">
        <Outlet />
        <FloatButton.Group
          trigger="click"
          type="primary"
          style={{ insetInlineEnd: 16 }}
          icon={<SmileFilled />}
          className="phone:mr-2 tablet:mr-20 desktop:mr-40"
        >
          <FloatButton
            icon={<HomeOutlined />}
            tooltip={<div>홈으로 이동하기</div>}
            onClick={() => {
              navigate("/");
            }}
          />
          <FloatButton
            icon={<CalendarOutlined />}
            tooltip={<div>달력으로 보기</div>}
            onClick={() => {
              navigate("/calendar");
            }}
          />
          <FloatButton
            icon={<FileAddOutlined />}
            tooltip={<div>할 일 추가하기</div>}
            onClick={() => {
              navigate("/create");
            }}
          ></FloatButton>
          <FloatButton
            icon={<OrderedListOutlined />}
            tooltip={<div>해야 할 일 모음</div>}
            onClick={() => {
              navigate("/todos");
            }}
          />
          <FloatButton
            icon={<CheckOutlined />}
            tooltip={<div>완료된 일 모음</div>}
            onClick={() => {
              navigate("/dones");
            }}
          />
          <FloatButton
            icon={<PlusOutlined />}
            tooltip={<div>임의로 할 일 추가하기</div>}
            onClick={() => {
              addTodos();
            }}
          />
        </FloatButton.Group>
      </div>
      <Footer />
    </div>
  );
};

export default App;
