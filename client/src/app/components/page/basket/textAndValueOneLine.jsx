import React from 'react';
import PropTypes from 'prop-types';

const TextAndValueOneLine = ({ text, value }) => {
  return (
    <div className="d-flex flex-nowrap justify-content-between m-2">
      <div className="fs-4 lh-1">{ text }</div>
      <div className="flex-grow-1 border-bottom border-2"></div>
      <div className="fs-4 lh-1">{ value }</div>
    </div>
  );
};

TextAndValueOneLine.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TextAndValueOneLine;
