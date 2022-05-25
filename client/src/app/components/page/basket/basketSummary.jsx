import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextAndValueOneLine from './textAndValueOneLine';
import { getIsLoggedIn } from '../../../store/user';
import { useSelector } from 'react-redux';

const BasketSummary = ({ countProductName, countProduct, totalCost }) => {
  const isAuth = useSelector(getIsLoggedIn());
  return (
    <div
      className="d-flex flex-column mx-2 position-sticky border border-3 rounded-3 border-primary"
      style={ { maxHeight: '40vh', position: 'sticky', top: '5rem', width: '100%' } }
    >
      <TextAndValueOneLine text={ 'Всего наименований' } value={ countProductName } />
      <TextAndValueOneLine text={ 'Количество товаров' } value={ countProduct } />
      <TextAndValueOneLine text={ 'Итог' } value={ totalCost } />
      { isAuth
        ? <Link to={ '#' } role={ 'button' } className='btn btn-outline-success m-3 mt-auto'>Оформить заказ</Link>
        : <Link to={ '/login' } role={ 'button' } className='btn btn-outline-success m-3 mt-auto'>Log in</Link>
      }
    </div>
  );
};

BasketSummary.propTypes = {
  countProductName: PropTypes.number,
  totalCost: PropTypes.string,
  countProduct: PropTypes.number
};

export default BasketSummary;
