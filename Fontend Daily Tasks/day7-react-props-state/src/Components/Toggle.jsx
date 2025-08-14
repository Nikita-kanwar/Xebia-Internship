import React from "react";

const Toggle = () => {
  const [Show, setShow] = React.useState(false);

  return (
    <div className="Toggle">
      {Show ? <p>This is a Message to Show</p> : null}

      {/* <button onClick={()=>setShow(true)} >Show Message</button>
      <button onClick={()=>setShow(false)} >Hide Message</button> */}
      <button onClick={() => setShow(!Show)}>
        {Show ? "Hide Message" : "Show Message"}
      </button>
    </div>
  );
};

export default Toggle;
