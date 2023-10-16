import React, { ChangeEvent, FocusEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  id: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  name,
  id,
  value,
  onChange,
  onBlur,
  placeholder
}) => {
  return (
    <div className="input__repair-id">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        name={name}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
