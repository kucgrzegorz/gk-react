import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'shared/form/BwmInput';
import { BwmResError } from 'shared/form/BwmResError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
          <Field
            name="username"
            type="text"
            label='Username'
            className='form-control'
            component={BwmInput}
          />
          <Field
            name="email"
            type="email"
            label='Email'
            className='form-control'
            component={BwmInput}
          />
          <Field
            name="password"
            type="password"
            label='Password'
            className='form-control'
            component={BwmInput}
          />
          <Field
            name="passwordConfirmation"
            type="password"
            label='Password Confirmation'
            className='form-control'
            component={BwmInput}
          />
        <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
          Zarejestruj
        </button>
        <BwmResError errors={errors} /> 
    </form>
  )
}

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = 'Nazwa użytkownika powinna posiadać minimum 4 znaki!';
  }

  if (!values.email) {
    errors.email = 'Wpisz adres email';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Wpisz hasło!';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Hasła muszą być takie same';
  }

  return errors;

}


export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)