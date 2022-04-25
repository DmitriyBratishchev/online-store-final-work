import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loadCurrentUser } from '../store/user';

const Basket = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser());

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, []);
  console.log('user in basket', user);

  return (
    <h2>Корзина</h2>
  );
};

export default Basket;
