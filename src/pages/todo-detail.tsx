import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Rate,
  TimePicker,
  message,
} from "antd";
import Header from "components/header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AllTodosState } from "store/all-todos-slice";
import { ResponsivePadding } from "styles/my-style";
import dayjs from "dayjs"; // 날짜 포맷팅을 위해 사용
import {
  deleteOneTodo,
  formatDate,
  formatTime,
  updateOneTodo,
  valueUpdate,
} from "utils/todo-utils";
// icon
import { EditOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TodoDetail = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm(); // useForm을 통해 form 인스턴스를 생성
  const navigate = useNavigate();
  const { todoId } = useParams();
  const todo = useSelector(
    (state: AllTodosState) => state.allTodos.todos[Number(todoId)]
  );
  // 불러온 데이터를 Form에 설정 (useEffect로 처리)
  useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        title: todo.title,
        schedule: [
          dayjs(todo.startDate), // 시작일을 Day.js 객체로 변환
          dayjs(todo.endDate), // 종료일을 Day.js 객체로 변환
        ],
        deadline: dayjs(todo.time, "HH:mm:ss"), // 시간을 Day.js로 변환
        content: todo.content,
        importance: todo.rate,
      });
    }
  }, [todo, form]);

  const clickDelete = () => {
    deleteOneTodo(Number(todoId));
    message.success("삭제가 성공적으로 완료되었습니다.");
    // replace true로 바꾸면서 뒤로 못가게 만들기
    navigate("/", { replace: true });
  };

  const clickUpdate = () => {
    const formData = form.getFieldsValue();
    const title = formData.title;
    const deadline =
      formData.deadline === undefined
        ? "00:00:00"
        : formatTime(formData.deadline.$d);
    const schedule = formData.schedule;
    const startDate =
      schedule === undefined ? "0000-00-00" : formatDate(schedule[0].$d);
    const endDate =
      schedule === undefined ? "0000-00-00" : formatDate(schedule[1].$d);
    const content = formData.content === undefined ? "" : formData.content;
    const importance =
      formData.importance === undefined ? 1 : formData.importance;

    // todo로 가공
    const newTodo = {
      title,
      rate: importance,
      time: deadline,
      content,
      startDate: startDate,
      endDate: endDate,
      isDone: false,
    };
    // 필수 값 확인 (title과 startDate)
    if (!newTodo.title || newTodo.startDate === "0000-00-00") {
      message.error("제목과 일정 선택은 필수 항목입니다.");
      console.log(newTodo.time);
      return;
    }
    valueUpdate(Number(todoId), newTodo);
    message.success("수정이 완료되었습니다.");
    setComponentDisabled(true);
  };

  const clickChange = () => {
    if (todo.isDone) {
      message.success("재활성화 되었습니다.");
    } else {
      message.success("완료처리 되었습니다.");
    }
    updateOneTodo(Number(todoId));
  };

  return (
    <div className="size-full">
      <Header theme="상세 일정" icon={<EditOutlined />} />
      <div className={`${ResponsivePadding} size-full`}>
        <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          disabled={componentDisabled}
          // onFinish={onFinish}
        >
          <Form.Item label="제목" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="일정" name="schedule">
            <RangePicker />
          </Form.Item>
          <Form.Item label="마감 시간" name="deadline">
            <TimePicker />
          </Form.Item>
          <Form.Item label="주요 내용" name="content">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="중요도" name="importance">
            <Rate />
          </Form.Item>
          <div>
            <Form.Item className="flex flex-col">
              <Button
                className="mx-4"
                type="primary"
                htmlType="submit"
                onClick={clickUpdate}
              >
                수정하기
              </Button>
              <Button
                className="mr-4"
                type="primary"
                danger
                htmlType="submit"
                onClick={clickDelete}
              >
                삭제하기
              </Button>
              <Button type="dashed" htmlType="submit" onClick={clickChange}>
                {todo.isDone ? "재활성화" : "완료하기"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default TodoDetail;
