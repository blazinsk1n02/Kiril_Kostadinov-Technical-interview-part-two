import { Button, Collapse } from "antd";
import CreatePostModal from "./CreatePostModal";

import { useState } from "react";

const UserPosts = ({ posts }) => {
  const [showModal, setShowModal] = useState(false);

  const { Panel } = Collapse;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {posts?.map((post) => {
        return (
          <Collapse key={post.id}>
            <Panel header={post.title}>
              <div>{post.body}</div>
            </Panel>
          </Collapse>
        );
      })}

      <CreatePostModal visible={showModal} onCancel={handleCancelModal} />

      <Button type="primary" onClick={handleShowModal} style={{ marginTop: "20px" }}>
        New post
      </Button>
    </>
  );
};

export default UserPosts;
