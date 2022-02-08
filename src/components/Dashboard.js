import { Form } from "antd";

import User from "./User";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, usersSelector } from "../features/users";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, hasErrors } = useSelector(usersSelector);
  const [values, setValues] = useState(useSelector(usersSelector).users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setValues(users);
  }, [users]);

  const changeHandler = ({ name, value }, index) => {
    const updatedValues = [...values];
    if (
      name === "address-city" ||
      name === "address-street" ||
      name === "address-suite" ||
      name === "address-zipcode"
    ) {
      updatedValues.splice(index, 1, {
        ...values[index],
        address: {
          ...values[index].address,
          [name.split("-")[1]]: value,
        },
      });
    } else if (
      name === "company-catchPhrase" ||
      name === "company-bs" ||
      name === "company-name"
    ) {
      updatedValues.splice(index, 1, {
        ...values[index],
        company: {
          ...values[index].company,
          [name.split("-")[1]]: value,
        },
      });
    } else {
      updatedValues.splice(index, 1, {
        ...values[index],
        [name]: value,
      });
    }
    setValues(updatedValues);
  };

  const handleResetChanges = () => {
    setValues(users);
  };

  const renderUsers = values.map((user, index) => {

    return (
      <User
        user={user}
        index={index}
        key={user.id}
        changeHandler={changeHandler}
        handleResetChanges={handleResetChanges}
      />
    );
  });

  return (
    <Form labelCol={{ span: 3 }} autoComplete="off">
      {renderUsers}
    </Form>
  );
};

export default Dashboard;
