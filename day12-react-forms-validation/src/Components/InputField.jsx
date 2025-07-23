import React from "react";

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        {label}
        <br />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          style={{ padding: "8px", width: "100%" }}
        />
      </label>
      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}
    </div>
  );
};

export default InputField;
