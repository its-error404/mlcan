import React, { FC } from "react";
import OtpInput from "react-otp-input";
import { Field } from "formik";
import "./otpField.scss"

interface OTPFieldProps {
	name?: string
	value?: string
	numInputs?: number
	onChange?: (value: string) => void
}

const OTPField: FC<OTPFieldProps> = (props) => {
	const {
		name,
		value,
		onChange,
		numInputs = 6,
	} = props;

	return (
		<Field name={name}>
			{() => <div className="otp__container">
				<OtpInput
					className="otp-field"
					value={value}
					onChange={onChange}
					numInputs={numInputs}
				/>
			</div>}
		</Field>
	);
};

export default OTPField;

