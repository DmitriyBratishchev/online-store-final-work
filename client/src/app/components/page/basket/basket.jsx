import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardHorizontal from '../../ui/cardProduct/cardHorizontal';
import { getBasketList, getCountProductNames, getTotalCost, loadBasketList } from '../../../store/basket';
import { getBasketLength, getUser } from '../../../store/user';
import BasketSummary from './basketSummary';

const Basket = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser());
  const basketList = useSelector(getBasketList());
  const countProductName = useSelector(getCountProductNames());
  const countBasket = useSelector(getBasketLength());
  const totalCost = useSelector(getTotalCost());

  useEffect(() => {
    dispatch(loadBasketList());
  }, [user]);

  return (
    <div className='container'>
      <h2>Корзина</h2>
      <div className="d-flex">
        {
          basketList.length === 0
            ? <h2>Ваша корзина пока пуста.</h2>
            : <>
              <div className="col-8">
                { basketList.map(product => <CardHorizontal key={ product._id } element={ product } />) }
              </div>
              <BasketSummary
                countProductName={ countProductName }
                countProduct={ countBasket }
                totalCost={ totalCost }
              />
            </>
        }

      </div>
    </div >
  );
};

export default Basket;
