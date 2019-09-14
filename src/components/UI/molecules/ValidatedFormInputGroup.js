import React from "react";
import { FormGroup, InputGroup, TextArea } from "@blueprintjs/core";

const ValidatedFormInputGroup = ({
  label,
  id,
  labelInfo,
  placeholder,
  value,
  onChange,
  isTextArea,
  type,
  required
}) => {
  return (
    <FormGroup label={label} labelFor={id} labelInfo={labelInfo}>
      {isTextArea ? (
        <TextArea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          fill
          required={required}
        />
      ) : (
        <InputGroup
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
        />
      )}
    </FormGroup>
  );
};

export default ValidatedFormInputGroup;
