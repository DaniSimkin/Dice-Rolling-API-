import "./InputField.css";

const InputField = (props) => {
  const { placeholder, value, setValue, type = "text" } = props;
  return (
    <input
      className="InputFieldWrapper"
      placeholder={placeholder}
      value={value}
      onChange={setValue}
      type={type}
    />
  );
};

export default InputField;
