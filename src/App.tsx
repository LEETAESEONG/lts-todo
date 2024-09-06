import { Outlet, useNavigate } from "react-router-dom";
import {
  SmileFilled,
  FileAddOutlined,
  HomeOutlined,
  CheckOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
const App = () => {
  const navigate = useNavigate();
  return (
    <div className="phone:px-4 tablet:px-20 desktop:px-40 min-h-screen min-w-screen">
      <div className="w-full">
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
        </FloatButton.Group>
      </div>
    </div>
  );
};

export default App;
