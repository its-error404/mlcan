import React, { ChangeEvent } from 'react';

interface InputProps {
  label?: string;
  name?: string;
  id?: string;
  className: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const CustomInput: React.FC<InputProps> = ({
  name,
  id,
  value,
  onChange,
  placeholder,
  className
}) => {
  return (
    <div>
      <br />
      <input
        type="text"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default CustomInput;
