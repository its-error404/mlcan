import React from "react";
import { Select } from "antd";
import "./dropdownField.scss";
import { Field, ErrorMessage } from "formik";
import Error from "../Error";

interface DropdownFieldProps {
  name: string;
  options?: any[];
  title?: string;
  placeholder?: string;
  value?: any;
  onChange?: (value: any, option: any) => void;
}

function DropdownField(props: DropdownFieldProps) {
  const {
    name,
    title,
    options,
    placeholder,
    onChange,
    value,
  } = props;

  return (
    <Field name={name}>
      {() => {
        return (
          <div
            className={`dropdown-field`}
          >
            {title && <div className="dropdown-field__title">{title}</div>}
            <Select
              options={options}
              placeholder={placeholder}
              onChange={onChange}
              allowClear
              value={value}
            />
            <ErrorMessage name={name}>
              {(message: string) => <Error message={message} />}
            </ErrorMessage>
          </div>
        );
      }}
    </Field>
  );
}

export default DropdownField;
