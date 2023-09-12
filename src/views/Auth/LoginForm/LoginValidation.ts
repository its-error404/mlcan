import * as yup from 'yup'
export interface LoginFormValues {
  email: string
  password: string
}

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid Email Address'),
  password: yup.string().required('Password is required !')
})

export default loginSchema
