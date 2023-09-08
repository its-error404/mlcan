import * as yup from 'yup'
import { ApiRoutes } from '../../../routes/routeConstants/apiRoutes'
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

export const onSubmit = async (
  values: LoginFormValues,
  login: (email: string, password: string) => Promise<boolean>,
  navigate: (route: string) => void,
  formik: any
) => {
  try {

    await validateForm(values);
    const success = await login(values.email, values.password);
    if (success) {
      navigate(ApiRoutes.CONTAINERS);
    } else {

      formik.setErrors({ password: "Check your password and try again!" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};
 

export default loginSchema
