import React, { ChangeEvent, FocusEvent } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  name: string;
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: FocusEvent<HTMLSelectElement>) => void;
  placeholder: string;
  className: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  label,
  name,
  id,
  value,
  options,
  onChange,
  onBlur,
  placeholder,
  className
}) => {
  return (
    <div className="select__container">
      <label htmlFor={id}>{label}</label>
      <br />
      <select
        name={name}
        onBlur={onBlur}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        className={className}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
