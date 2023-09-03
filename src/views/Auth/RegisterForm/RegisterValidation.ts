import * as yup from "yup";

export interface RegisterFormValues {
  email: string;
  password: string;
  phone: string;
}

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .required("An Email Address is Required")
    .email("Invalid Email Address!"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  phone: yup
    .string()
    .required("Please enter a valid phone number")
    .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
});

export default RegisterSchema;
