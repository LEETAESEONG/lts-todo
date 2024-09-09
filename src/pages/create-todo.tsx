import Header from "components/header";
import { ResponsivePadding } from "styles/my-style";
import { addOneTodo, formatDate } from "utils/todo-utils";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Rate,
  TimePicker,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateTodo = () => {
  const [form] = Form.useForm(); // useForm을 통해 form 인스턴스를 생성
  const navigate = useNavigate();

  const createNewTodo = () => {
    const formData = form.getFieldsValue();

    const title = formData.title;
    const deadline =
      formData.deadline === undefined ? "00:00:00" : formData.deadline;
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
    return newTodo;
  };

  const onFinish = () => {
    // todo로 가공
    const newTodo = createNewTodo();

    // 필수 값 확인 (title과 startDate)
    if (!newTodo.title || newTodo.startDate === "0000-00-00") {
      message.error("제목과 일정 선택은 필수 항목입니다.");
      return;
    }

    // redux 저장
    addOneTodo(newTodo);
    // 성공 메시지 보내고
    message.success("홈으로 이동합니다.");
    // navigate로 홈으로 이동
    navigate("/");
  };

  return (
    <div className="size-full">
      <Header theme="할 일 추가하기" />
      <div className={`${ResponsivePadding} size-full`}>
        {/* Form 컴포넌트에 form prop을 전달 */}
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
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
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default CreateTodo;
