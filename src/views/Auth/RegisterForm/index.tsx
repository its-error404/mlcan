import React from 'react'
import { useFormik } from 'formik'
import { ReactComponent as EmailIcon } from '../../../assets/single color icons - SVG/mail.svg'
import { ReactComponent as LockIcon } from '../../../assets/single color icons - SVG/password.svg'
import { ReactComponent as PhoneIcon } from '../../../assets/single color icons - SVG/call.svg'
import Logo from '../../../assets/Logo/PNG/MLCAN logo.png'
import RegisterSchema, { RegisterFormValues } from './RegisterValidation'
import * as Yup from 'yup'
import './RegisterForm.scss'
import { Link } from 'react-router-dom'

const initialValues: RegisterFormValues = {
  email: '',
  password: '',
  phone: ''
}

const validateForm = (values: RegisterFormValues) => {
  try {
    RegisterSchema.validateSync(values, { abortEarly: false })
    return {}
  } catch (errors) {
    const validationErrors: Record<string, string> = {}
    if (errors instanceof Yup.ValidationError) {
      errors.inner.forEach(error => {
        validationErrors[error.path] = error.message
      })
    }
    return validationErrors
  }
}
const RegisterForm = () => {
  const onSubmit = () => {
    console.log('Registered')
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: validateForm
  })

  return (
    <div className='register'>
      <div className='register-background'>
        <div className='mlcan-logo'>
          <img src={Logo} alt='Logo' width={400} />
        </div>
        <div className='register-box'>
          <h2>Register Here</h2>
          <br></br>
          <form className='register-form' onSubmit={formik.handleSubmit}>
            <div className='register-container'>
              <label htmlFor='email'>Email</label>
              <br></br>
              <br></br>
              <div className='email-data'>
                <span className='email-input-image'>
                  <EmailIcon width='16' height='16' fill='currentColor' />
                </span>
                <input
                  id='email'
                  name='email'
                  placeholder='Enter'
                  type='text'
                  className='email-input'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className='error-message'>{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className='password-container'>
              <label htmlFor='password'>Password</label>
              <br></br>
              <br></br>
              <div className='password-data'>
                <span className='password-input-image'>
                  <LockIcon width={16} height={16} fill='currentColor' />
                </span>
                <input
                  id='password'
                  name='password'
                  placeholder='Enter'
                  type='password'
                  className='password-input'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className='error-message'>{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            <div className='phone-container'>
              <label htmlFor='number'>Phone</label>
              <br></br>
              <br></br>
              <div className='phone-data'>
                <span className='phone-input-image'>
                  <PhoneIcon width={16} height={16} fill='currentColor' />
                </span>
                <input
                  id='phone'
                  name='phone'
                  placeholder='Enter'
                  type='text'
                  className='phone-input'
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className='error-message'>{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>

            <div className='register-items'>
              <button type='submit'>Register Now</button>
              <Link className='login-link' to='/'>
                Already Have an Account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
