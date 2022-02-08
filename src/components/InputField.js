import { Form, Input } from "antd";

const InputField = ({ user, changeHandler }) => {
  const handleChange = (e) => {
    changeHandler(e);
  };

  const inputField = Object.entries(user).map(([key, value], index) => {
    if (key === "id" || key === "name") {
      return null;
    } else if (key !== "address" && key !== "company") {
      return (
        <Form.Item label={key} key={`${key}-${index}`}>
          <Input
            name={key}
            value={value}
            onChange={(e) => handleChange(e.target)}
          />
        </Form.Item>
      );
    } else {
      return Object.entries(value).map(([item, val]) => {
        if (item === "geo") {
          return null;
        } else {
          return (
            <Form.Item label={item} key={`${item}-${index}`}>
              <Input
                name={`${key+'-'+item}`}
                value={val}
                onChange={(e) => handleChange(e.target)}
              />
            </Form.Item>
          );
        }
      });
    }
  });

  return <>{inputField}</>;
};

export default InputField;
