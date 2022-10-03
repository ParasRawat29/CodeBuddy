import React, { useState } from "react";

function FormInput({ label, errorMessage, onChange, id, ...inputProps }) {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className="formInput">
      <input
        {...inputProps}
        autoComplete="off"
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default FormInput;
