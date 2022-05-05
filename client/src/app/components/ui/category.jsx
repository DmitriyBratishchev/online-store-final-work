import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCategoryNameById } from '../../store/categories';

const Category = ({ _id }) => {
  const categoriesName = useSelector(getCategoryNameById(_id));
  if (categoriesName) {
    return <span>{ categoriesName }</span>;
  } else {
    return 'loading ...';
  }
};

Category.propTypes = {
  _id: PropTypes.string
};

export default Category;
