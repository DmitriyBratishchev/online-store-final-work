import React from 'react';
import PropTypes from 'prop-types';
import s from './pagination.module.css';

const PaginationButton = ({ text, onPageChange, className = '', active = false }) => {
  return (
    <button
      type="button"
      className={ 'btn btn-outline-primary' + ' ' + className }
      onClick={ onPageChange }
    >
      <div className={ active ? s.curentPage : '' }>{ text }</div>
    </button >
  );
};

PaginationButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  onPageChange: PropTypes.func,
  active: PropTypes.bool
};

export default PaginationButton;
