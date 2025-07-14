import React from "react";
import { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="counter">
      <div className="count-card">Count is {value}</div>
       <button
          className="incBtn"
          onClick={() => setValue((value) => value + 1)}
        >
          Increase Value
        </button>
        <button
          className="decBtn"
          onClick={() => setValue((value) => value - 1)}
        >
          Decrease Value
        </button>
        

    </div>
  );
};

export default Counter;
