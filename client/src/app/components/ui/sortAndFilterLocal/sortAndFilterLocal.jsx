import React from 'react';
import PropTypes from 'prop-types';
import RadioGroupField from '../../common/form/radioGroupField';

const SortAndFilterLocal = ({ handleSort, sortingName, order }) => {
  return (
    <div className="d-flex justify-content-between px-2 pt-4 pb-3 mb-3" style={ { maxHeight: '40vh', position: 'sticky', top: '62px', zIndex: 100, backgroundColor: 'white' } }>
      <RadioGroupField
        options={
          [
            { value: '', name: 'Без сортировки' },
            { value: 'name', name: 'Название' },
            { value: 'price', name: 'Цена' },
            { value: 'numberOfGoods', name: 'Осталось на складе' }
          ]
        }
        name={ 'sortingName' }
        onChange={ handleSort }
        value={ sortingName }
      // label='Сортировать по:'
      />
      { sortingName !== '' &&
        <RadioGroupField
          className='ms-3 me-auto'
          options={
            [
              { value: 'asc', name: <i className="bi bi-arrow-up-short"></i> },
              { value: 'desc', name: <i className="bi bi-arrow-down-short"></i> }
            ]
          }
          name={ 'order' }
          onChange={ handleSort }
          value={ order }
        /> }
    </div >
  );
};

SortAndFilterLocal.propTypes = {
  handleSort: PropTypes.func,
  sortingName: PropTypes.string,
  order: PropTypes.string
};

export default SortAndFilterLocal;
