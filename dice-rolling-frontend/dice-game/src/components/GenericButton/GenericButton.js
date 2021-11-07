import "./GenericButton.css";

const GenericButton = (props) => {
  const { label, onClick } = props;
  return (
    <button className="GenericButtonWrapper" onClick={onClick}>
      {label}
    </button>
  );
};

export default GenericButton;
