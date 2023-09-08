import * as yup from 'yup';

export interface LoginFormValues {
  email: string
  password: string
}

const validateLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('An Email-Address is required!')
    .email('Invalid Email Address!'),
  password: yup.string().required('Password is required!'),
});

export default validateLoginSchema
