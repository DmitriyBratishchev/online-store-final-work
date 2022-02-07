import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  value,
  name,
  onChange,
  onFocus,
  defaultOption,
  options,
  required,
  error
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
        name: options[optionName].name,
        id: options[optionName].id
      }))
      : options;
  return (
    <div className='mb-4'>
      <label htmlFor={ name } className='form-label'>
        { label } { required && <span className='text-danger'>*</span> }
      </label>
      <select
        onFocus={ onFocus }
        className={ getInputClasses() }
        name={ name }
        value={ value }
        onChange={ handleChange }
      >
        <option disabled value=''>
          { defaultOption }
        </option>
        { optionsArray &&
          optionsArray.map((option) => (
            <option key={ option.id } value={ option.id }>
              { option.name }
            </option>
          )) }
      </select>
      { error && <div className='invalid-feedback'>{ error }</div> }
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;
