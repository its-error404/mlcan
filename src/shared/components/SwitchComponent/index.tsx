import React, { FC } from 'react'
import { Switch } from 'antd'
import { Field } from 'formik'
import "./switchComponent.scss"
import { SwitchChangeEventHandler } from 'antd/lib/switch'

interface SwitchComponentProps {
    name?: string
    checked?: boolean
    onChange?: SwitchChangeEventHandler
}

const SwitchComponent: FC<SwitchComponentProps> = (props) => {

    const {
        name,
        checked,
        onChange,
    } = props

    return (
        <Field name={name}>
            {({field}:any) => <div className="switch-component">
                <Switch
                    {...field}
                    checked={checked}
                    onChange={onChange}
                />
            </div>}
        </Field>
    )
}

export default SwitchComponent