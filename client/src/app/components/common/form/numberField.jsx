import React from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';

const NumberField = ({
  label,
  name,
  value,
  required,
  placeholder,
  onlyPositive = false,
  error,
  onChange,
  onFocus
}) => {
  const handleChange = ({ target }) => {
    console.log('target.value', target.value, typeof target.value, /[^0-9]/g.test(target.value));
    if (/[^0-9]/g.test(target.value)) {
      console.log('in if');
      onChange({ name: target.name, value: value });
    } else {
      onChange({ name: target.name, value: toNumber(target.value) });
    }
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  console.log('value', value, typeof value);
  return (
    <div className='mb-4'>
      { label && (
        <label htmlFor={ name } className='form-label'>
          { label } { required && <span className='text-danger'>*</span> }
        </label>
      ) }
      <div className='input-group'>
        <input
          type='text'
          autoComplete='off'
          id={ name }
          name={ name }
          value={ value }
          placeholder={ placeholder }
          onChange={ handleChange }
          onFocus={ onFocus }
          className={ getInputClasses() }
        />
        { error && <div className='invalid-feedback'>{ error }</div> }
      </div>
    </div>
  );
};

NumberField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onlyPositive: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

export default NumberField;
