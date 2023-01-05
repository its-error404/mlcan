import React, { FC } from 'react'
import "./datePickerField.scss"
import { DatePicker } from "antd";
import { ErrorMessage, Field } from "formik";
import Error from "../Error";
import moment from "moment";

interface DatePickerFieldProps {
    name: string;
    title?: string;
    placeholder?: string;
    value?: string;
    onChange: (value: any, dateString: string) => void;
    disabled?: boolean;
    format?: string;
}

const DatePickerField: FC<DatePickerFieldProps> = (props) => {
    const {
        name,
        title,
        placeholder,
        onChange,
        value,
        disabled,
        format = "YYYY-MM-DD",
    } = props;

    function range(start: number, end: number) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    return (
        <Field name={name}>
            {() => {
                return (
                    <div className={`datepicker-field`}>
                        {title && (
                            <div className="dropdown-field__title">{title}</div>
                        )}
                        <DatePicker
                            format={format}
                            disabled={disabled}
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value ? moment(value) : null}
                        />
                        <ErrorMessage name={name}>
                            {(message: string) => (
                                // @ts-ignore
                                <Error className={`${name}__error`}
                                    message={message}
                                />
                            )}
                        </ErrorMessage>
                    </div>
                );
            }}
        </Field>
    )
}

export default DatePickerField;