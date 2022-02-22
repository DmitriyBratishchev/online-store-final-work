import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCategories } from '../../store/categories';

const Category = ({ _id }) => {
  console.log('id', _id);
  const categories = useSelector(getCategories());
  if (categories.length) {
    const category = categories.find(c => c._id === _id);
    return <span>{ category.name }</span>;
  } else {
    return 'loading ...';
  }
};

Category.propTypes = {
  _id: PropTypes.string
};

export default Category;
