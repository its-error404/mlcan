import * as yup from 'yup'
export interface LoginFormValues {
  email: string
  password: string
}

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid Email Address'),
  password: yup.string().required('Password is required !')
})


export const validateForm = async (values: LoginFormValues) => {
  try {
    await loginSchema.validate(values, { abortEarly: false });
    return {}; 
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: { [key: string]: string } = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      return errors;
    }
    throw error;
  }
};



export default loginSchema
