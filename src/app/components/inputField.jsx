import React, { forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      className={`bg-movies-input p-2 border-0 my-2 rounded ${props.className}`}
    />
  );
});

InputField.displayName = "InputField";

export default InputField;
