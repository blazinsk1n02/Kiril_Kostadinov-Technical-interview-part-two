import { useEffect, useState } from "react";
import * as getData from "../getData";

import { Collapse, Input, Button } from "antd";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData.getUsers().then((result) => {
      console.log("comp", result);
      setUsers(result);
    });
  }, []);

  const { Panel } = Collapse;

  const changeHandler = ({ name, value }, index) => {
    const updateUsers = [...users];
    updateUsers.splice(index, 1, {
      ...users[index],
      [name]: value,
    });
    setUsers(updateUsers);
  };

  console.log("comp reload");

  const renderUsers = users.map((user, index) => {
    return (
      <Collapse defaultActiveKey={["1"]} key={user.id}>
        <Panel header={user.name}>
          <Input
            name="email"
            value={user.email}
            onChange={(e) => changeHandler(e.target, index)}
          />
          <Input
            name="username"
            value={user.username}
            onChange={changeHandler}
          />
          <Input name="phone" 
          value={user.phone} 
          onChange={changeHandler} 
          />
          <Input name="website" 
          value={user.website} 
          onChange={changeHandler} 
          />
          <Input
            name="city"
            value={user.address.city}
            onChange={changeHandler}
          />
          <Input
            name="street"
            value={user.address.street}
            onChange={changeHandler}
          />
          <Input
            name="suite"
            value={user.address.suite}
            onChange={changeHandler}
          />
          <Input
            name="zipcode"
            value={user.address.zipcode}
            onChange={changeHandler}
          />
          <div className="btn-container">
            <Button type="primary">Submit</Button>
            <Button danger>Reset</Button>
          </div>
        </Panel>
      </Collapse>
    );
  });

  return <div>{renderUsers}</div>;
};

export default Home;
