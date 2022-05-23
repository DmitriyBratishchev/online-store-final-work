import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, value, onChange }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={ name }> { label }</label>
      <div className="input-group">
        <textarea
          style={ { display: 'inline-block', width: '100%', minHeight: '150px' } }
          spellCheck={ true }
          id={ name }
          name={ name }
          value={ value || '' }
          onChange={ handleChange }
        />
      </div>
    </div>
  );
};
TextAreaField.defaultProps = {
  type: 'text'
};
TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextAreaField;
