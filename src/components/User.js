import { Button, Collapse } from "antd";

import { useDispatch, useSelector } from "react-redux";

import InputField from "./InputField";
import UserPosts from "./UserPosts";
import { fetchPosts, postsSelector } from "../features/posts";
import { useMemo, useState } from "react";
import { usersSelector } from "../features/users";

const User = ({ user, index, changeHandler, handleResetChanges }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector(postsSelector);
  const [hasChanges, setHasChanges] = useState(false);
  const { users, loading, hasErrors } = useSelector(usersSelector);

  const { Panel } = Collapse;

  const initialUser = users[index];

  const handleChange = (e) => {
    changeHandler(e, index);
  };

  const checkForChanges = () => {
    const objectsEqual = (o1, o2) =>
      typeof o1 === "object" && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length &&
          Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

    if (objectsEqual(user, initialUser)) {
      setHasChanges(false);
    } else {
      setHasChanges(true);
    }
  };

  useMemo(() => checkForChanges(user), [user]);

  return (
    <Collapse>
      <Panel header={user.name}>
        <div className="user-details">
          <InputField user={user} changeHandler={(e) => handleChange(e)} />

          <Button type="primary" disabled={hasChanges ? false : true}>
            Submit
          </Button>

          <Button
            danger
            onClick={handleResetChanges}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </Button>
        </div>
        <div className="btn-container" style={{ marginTop: "20px" }}>
          <Button type="primary" onClick={() => dispatch(fetchPosts(user.id))}>
            Get user’s posts
          </Button>
        </div>

        {posts?.length > 0 ? (
          <div className="posts-container" style={{ padding: "20px 0" }}>
            {posts?.[0].userId === user.id && <UserPosts posts={posts} />}
          </div>
        ) : null}
      </Panel>
    </Collapse>
  );
};

export default User;
