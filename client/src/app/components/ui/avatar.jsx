import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAvatar } from '../../store/user';

const Avatar = ({ imageLink, width = '65' }) => {
  const image = useSelector(getAvatar()) || `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).slice(-5)}.svg`;
  return (
    <img
      src={ image }
      className='rounded-circle shadow-1-strong me-3'
      alt='avatar'
      width={ width }
    />
  );
};

Avatar.propTypes = {
  imageLink: PropTypes.string,
  width: PropTypes.string
};

export default Avatar;
