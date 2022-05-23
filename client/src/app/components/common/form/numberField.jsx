import React from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';

const NumberField = ({
  label,
  name,
  value,
  required,
  placeholder,
  className,
  onlyPositive = false,
  error,
  onChange,
  onFocus
}) => {
  const handleChange = ({ target }) => {
    if (/[^0-9]/g.test(target.value)) {
      onChange({ name: target.name, value: value });
    } else {
      onChange({ name: target.name, value: toNumber(target.value) });
    }
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  return (
    <div className={ className || 'mb-4' }>
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
  className: PropTypes.string,
  onlyPositive: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

export default NumberField;
