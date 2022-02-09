import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCategories } from '../../store/categories';

const Category = ({ id }) => {
  console.log('id', id);
  const categories = useSelector(getCategories());
  if (categories.length) {
    const category = categories.find(c => c.id === id);
    return <span>{ category.name }</span>;
  } else {
    return 'loading ...';
  }
};

Category.propTypes = {
  id: PropTypes.string
};

export default Category;
