import { Form, Input, Modal, Button } from "antd";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addPost } from "../features/posts";

const CreatePostModal = ({ visible, onCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newPost, setNewPost] = useState({});

  const dispatch = useDispatch();

  const { TextArea } = Input;

  const changeHandler = (e) => {
    console.log(e.target.name);
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(addPost(newPost));
    setNewPost({});
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title="Create new post"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={(e) => onCancel(e)}
        footer={null}
      >
        <Form
          onSubmit={submitHandler}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item rules={[{ required: true }]}>
            <Input placeholder="Title" name="title" onChange={changeHandler} />
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <TextArea
              name="body"
              placeholder="Post content..."
              autoSize={{ minRows: 2, maxRows: 8 }}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePostModal;
