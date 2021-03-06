import React from 'react';
import PropTypes from 'prop-types';

const CardTitle = ({ children, className = '', ...rest }) => {
  const propClassName = className ? ` ${className}` : '';
  return (
    <h3 className={ '' + propClassName } { ...rest }>{ children }</h3>
  );
};

CardTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};

export default CardTitle;
