// import * as Yup from  "yup";

// export const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email('E-mail is not valid!')
//       .required('E-mail is required!'),
//     password: Yup.string()
//       .min(6, 'Password has to be longer than 6 characters!')
//       .required('Password is required!')
//   })

export interface LoginFormValues {
  email: string
  password: string
}

export const validateLogin = (values: LoginFormValues) => {
  const errors: Record<string, string> = {}

  if (!values.email) {
    errors.email = 'An Email-Address is required!'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email Address!'
  }

  if (!values.password) {
    errors.password = 'Password is required!'
  }

  return errors
}

export default validateLogin
