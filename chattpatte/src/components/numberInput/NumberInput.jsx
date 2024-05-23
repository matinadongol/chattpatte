import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./numberInput.css";

const NumberInput = ({ onDelete }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="numberInputContainer">
      <button className="decrementButton" onClick=    {handleDecrement}>
          <FontAwesomeIcon icon={faMinus} />
      </button>
      <input
          type="text"
          value={count}
          className="numberInputField"
          readOnly
      />
      <button className="incrementButton" onClick={handleIncrement}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default NumberInput;
