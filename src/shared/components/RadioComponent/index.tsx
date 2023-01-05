import React, { FC } from 'react'
import "./radioComponent.scss"
import { Radio, CheckboxOptionType, RadioChangeEvent } from "antd";
import { Field } from 'formik';

interface RadioComponentProps {
    name: string
    value?: string | number
    options: CheckboxOptionType[]
    onChange: (e: RadioChangeEvent) => void
}

const RadioComponent: FC<RadioComponentProps> = (props) => {

    const {
        name,
        value,
        options,
        onChange,
    } = props

    return (
        <Field name={name}>
            {({ field }: any) => <div className="radio-component">
                <Radio.Group
                    {...field}
                    value={value}
                    options={options}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>}
        </Field>
    )
}

export default RadioComponent