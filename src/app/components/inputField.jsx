import React, { InputHTMLAttributes, forwardRef } from "react";

const InputField = forwardRef((props, ref) => {
  return (
    <div>
      <input
        {...props}
        className={"bg-movies-input p-2 border-0 my-2 rounded"}
      />
    </div>
  );
});

export default InputField;
