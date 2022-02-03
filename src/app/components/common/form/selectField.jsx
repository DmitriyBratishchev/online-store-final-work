import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
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
        { label }
      </label>
      <select
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
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default SelectField;
