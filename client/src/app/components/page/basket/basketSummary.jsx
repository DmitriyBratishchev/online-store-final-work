import React from 'react';
import PropTypes from 'prop-types';
import TextAndValueOneLine from './textAndValueOneLine';

const BasketSummary = ({ countProductName, countProduct, totalCost }) => {
  return (
    <div
      className="d-flex flex-column ms-4 position-sticky border border-3 rounded-3 border-primary me-3"
      style={ { maxHeight: '40vh', position: 'sticky', top: '5rem', width: '100%' } }
    >
      <TextAndValueOneLine text={ 'Всего наименований' } value={ countProductName } />
      <TextAndValueOneLine text={ 'Количество товаров' } value={ countProduct } />
      <TextAndValueOneLine text={ 'Итог' } value={ totalCost } />
      <button type='button' disabled={ !countProduct } className='btn btn-outline-success m-3 mt-auto'>Оформить заказ</button>
    </div>
  );
};

BasketSummary.propTypes = {
  countProductName: PropTypes.number,
  totalCost: PropTypes.string,
  countProduct: PropTypes.number
};

export default BasketSummary;
