import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardHorizontal from '../components/ui/cardProduct/cardHorizontal';
import { getBasketList, loadBasketList } from '../store/basket';
import { getUser } from '../store/user';

const Basket = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser());
  const basketList = useSelector(getBasketList());

  useEffect(() => {
    // if (localStorage.getItem('user-local-id')) {
    // dispatch(loadCurrentUser());
    dispatch(loadBasketList());
    // }
  }, [user.basket]);
  console.log('user in basket', user);
  console.log('basket in basket', basketList);

  return (
    <div className='container'>
      <h2>Корзина</h2>
      <div className="col-8">
        { basketList.length !== 0 && basketList.map(product => <CardHorizontal key={ product._id } element={ product } />) }

      </div>
    </div>
  );
};

export default Basket;
