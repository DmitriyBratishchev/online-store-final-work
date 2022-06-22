import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCategoryFilter, editPriceFilter, getFilterPrice, getFiterCategories } from '../../../store/filter';
import CheckBoxField from '../../common/form/checkBoxField';
import RangeField from '../../common/form/rangeField';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const filterCategories = useSelector(getFiterCategories());
  const filterPrice = useSelector(getFilterPrice());

  const handleChanges = ({ name, value }) => {
    dispatch(editCategoryFilter(name));
  };

  const handleChangePriceAfter = (num) => {
    dispatch(editPriceFilter(num));
  };

  return (
    <>
      <h4 className='mb-3'>Категории</h4>
      { filterCategories.length && filterCategories.map(category => {
        return (
          <CheckBoxField
            key={ category._id }
            name={ category._id }
            value={ category.checked }
            onChange={ handleChanges }
          >
            <span>{ category.name }</span>
          </CheckBoxField>
        );
      }) }
      <h4 className='mb-3'>Цена</h4>
      <RangeField
        min={ filterPrice.min }
        max={ filterPrice.max }
        interval={ filterPrice.interval }
        onAfterChange={ handleChangePriceAfter }
      />
    </>
  );
};

export default memo(FilterPanel);
