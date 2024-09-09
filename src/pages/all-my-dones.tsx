import {
  Empty,
  Table,
  Button,
  Flex,
  type TableColumnsType,
  type TableProps,
  message,
  Rate,
} from "antd";
import Header from "components/header";
import { useSelector } from "react-redux";
import { AllTodosState } from "store/all-todos-slice";
import { ResponsivePadding } from "styles/my-style";

// icons
import {
  CheckOutlined,
} from "@ant-design/icons";

import type { TodoType } from "store/all-todos-slice";
import { useState } from "react";
import { deleteTodos, updateTodos } from "utils/todo-utils";
import { Link } from "react-router-dom";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

const AllMyDones = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const allDones = Object.values(
    useSelector((state: AllTodosState) => state.allTodos.todos)
  )
    .map((e) => {
      return {
        ...e,
        key: e.id,
      };
    })
    .filter((e) => e.isDone);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: TableColumnsType<TodoType> = [
    {
      title: "id",
      dataIndex: "id",
      render: (id: string) => {
        return <Link to={`/todo/${id}`}>{id}</Link>;
      },
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "중요도",
      dataIndex: "rate",
      sorter: (a, b) =>
        b.rate - a.rate ||
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime() ||
        a.time.localeCompare(b.time),
      render: (rate: number) => {
        return <Rate disabled defaultValue={rate} />;
      },
    },
    {
      title: "마감 시간",
      dataIndex: "time",
    },
    {
      title: "내용",
      dataIndex: "content",
    },
    {
      title: "시작",
      dataIndex: "startDate",
      sorter: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime() ||
        a.time.localeCompare(b.time) ||
        b.rate - a.rate,
    },
    {
      title: "끝",
      dataIndex: "startDate",
    },
  ];

  const rowSelection: TableRowSelection<TodoType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleClick = (how: string) => {
    if (how === "todo") {
      message.success("재활성화 되었습니다.");
      updateTodos(selectedRowKeys);
    } else if (how === "delete") {
      message.success("삭제 완료 되었습니다.");
      deleteTodos(selectedRowKeys);
    }
  };

  return (
    <div className="size-full">
      <Header theme="완료된 일" icon={<CheckOutlined />} />
      <div className={`${ResponsivePadding} size-full`}>
        {allDones.length === 0 ? (
          <>
            <Empty />
          </>
        ) : (
          <>
            {" "}
            <Flex gap="middle" vertical>
              <Flex align="center" gap="middle">
                <Button
                  type="primary"
                  onClick={() => handleClick("todo")}
                  disabled={!hasSelected}
                >
                  재활성화
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleClick("delete")}
                  disabled={!hasSelected}
                >
                  삭제하기
                </Button>
                {hasSelected
                  ? `${selectedRowKeys.length}개의 항목이 선택됨`
                  : null}
              </Flex>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={allDones}
              />
            </Flex>
          </>
        )}
      </div>
    </div>
  );
};
export default AllMyDones;
