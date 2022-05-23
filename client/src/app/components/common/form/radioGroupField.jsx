import React from 'react';
import PropTypes from 'prop-types';
const RadioGroupField = ({ options, name, onChange, value, label, className = '' }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const colorText = (checked) => checked ? 'text-white' : 'text-black';
  return (
    <div className={ 'd-flex flex-column ' + className }>
      { label && <label className="form-label">{ label }</label> }
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        { options && options.map((option) => {
          return (
            <React.Fragment key={ option.name + '_' + option.value }>
              <input
                key={ option.name + '_' + option.value }
                type="radio"
                className="btn-check"
                name={ name }
                id={ option.name + '_' + option.value }
                onChange={ handleChange }
                checked={ option.value === value }
                value={ option.value }
              />
              <label
                className={ `btn btn-outline-primary text-black my-auto ${colorText(option.value === value)}` }
                htmlFor={ option.name + '_' + option.value }
              >
                { option.name }
              </label>
            </React.Fragment>
          );
        }) }
      </div>
    </div>
  );
};

RadioGroupField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
};

export default RadioGroupField;
