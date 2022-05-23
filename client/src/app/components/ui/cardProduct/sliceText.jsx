import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SliceText = ({ text = '', maxCountLetters = 150 }) => {
  const isTextNeedSliced = text.length > maxCountLetters;
  if (!isTextNeedSliced) {
    return <span>{ text || 'нет описания' }</span>;
  } else {
    const [textHiden, setTextHiden] = useState(true);

    const newTextIndex = text.slice(0, maxCountLetters).lastIndexOf(' ');
    const newText = text.slice(0, newTextIndex);
    return (
      <span>
        { textHiden ? newText + '.....' : text }
        <span
          role={ 'button' }
          className='ms-3 text-primary cursor-pointer'
          onClick={ () => setTextHiden(!textHiden) }>
          { textHiden ? 'Развернуть' : 'Свернуть' }
        </span>
      </span>
    );
  }
};

SliceText.propTypes = {
  text: PropTypes.string,
  maxCountLetters: PropTypes.string
};

export default SliceText;
