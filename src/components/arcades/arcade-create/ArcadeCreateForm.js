import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'shared/form/BwmInput';
import { BwmSelect } from 'shared/form/BwmSelect';
import { BwmTextArea } from 'shared/form/BwmTextArea';
import { BwmFileUpload } from 'shared/form/BwmFileUpload';
import { BwmResError } from 'shared/form/BwmResError';
// import { required, minLength4 } from 'shared/form/validators';

const ArcadeCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
            name="title"
            type="text"
            label='Nazwa'
            className='form-control'
            component={BwmInput}
          />
          <Field
            name="description"
            type="text"
            label='Opis'
            rows='6'
            className='form-control'
            component={BwmTextArea}
          />
            <Field
            name="city"
            type="text"
            label='Miasto'
            className='form-control'
            component={BwmInput}
          />
            <Field
            name="street"
            type="text"
            label='Ulica'
            className='form-control'
            component={BwmInput}
          />
            <Field
            options={options}
            name="category"
            label='Kategoria'
            className='form-control'
            component={BwmSelect}
          />
          <Field
            name="image"
            label='Image'
            component={BwmFileUpload}
          />
            <Field
            name="stations"
            type="number"
            label='Ilość stacji'
            className='form-control'
            component={BwmInput}
          />
          <Field
            name="dailyRate"
            type="text"
            label='Cena za dzień'
            className='form-control'
            symbol='zł'
            component={BwmInput}
          />
          <Field
            name="shared"
            type="checkbox"
            label='Imprezy integracyjne/firmowe'
            className='form-control'
            component={BwmInput}
          />
        <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
          Stwórz salon
        </button>
        <BwmResError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'arcadeCreateForm',
  initialValues: { shared: false, category: 'Salon' }
})(ArcadeCreateForm)