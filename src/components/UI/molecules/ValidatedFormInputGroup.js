import React from "react";
import { FormGroup, InputGroup, Intent, TextArea } from "@blueprintjs/core";

const ValidatedFormInputGroup = ({
  label,
  id,
  labelInfo,
  placeholder,
  value,
  onChange,
  isValid = true,
  invalidMessage,
  isTextArea,
  type,
  required
}) => {
  return (
    <FormGroup
      label={label}
      labelFor={id}
      labelInfo={labelInfo}
      helperText={isValid ? "" : invalidMessage}
      intent={isValid ? Intent.NONE : Intent.DANGER}
    >
      {isTextArea ? (
        <TextArea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          intent={isValid ? Intent.NONE : Intent.DANGER}
          fill
          required={required}
        />
      ) : (
        <InputGroup
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          intent={isValid ? Intent.NONE : Intent.DANGER}
          type={type}
          required={required}
        />
      )}
    </FormGroup>
  );
};

export default ValidatedFormInputGroup;
