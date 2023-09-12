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

export const onSubmit = async (
  values: LoginFormValues,
  login: (email: string, password: string) => Promise<boolean>,
  navigate: (route: string) => void,
  setErrors: any
) => {
  try {
    await loginSchema.validate(values, { abortEarly: false });

    const success = await login(values.email, values.password);
    if (success) {
      navigate(ApiRoutes.CONTAINERS);
    } else {
      setErrors({ password: "Check your password and try again!" });
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: { [key: string]: string } = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setErrors(errors);
    } else {
      console.log("Error", error);
    }
  }
};

export default loginSchema
