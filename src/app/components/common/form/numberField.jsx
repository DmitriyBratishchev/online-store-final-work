import React from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';

const NumberField = ({
  label,
  name,
  value,
  required,
  placeholder,
  error,
  onChange,
  onFocus
}) => {
  const handleChange = ({ target }) => {
    // if (/[^0-9]/g.test(target.value)) return;
    onChange({ name: target.name, value: toNumber(target.value) });
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  return (
    <div className='mb-4'>
      { label && (
        <label htmlFor={ name } className='form-label'>
          { label } { required && <span className='text-danger'>*</span> }
        </label>
      ) }
      <div className='input-group'>
        <input
          type='number'
          autoComplete='off'
          id={ name }
          name={ name }
          value={ toNumber(value) || '' }
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
  value: PropTypes.number,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

export default NumberField;
