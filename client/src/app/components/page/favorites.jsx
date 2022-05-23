import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardHorizontal from '../ui/cardProduct/cardHorizontal';
import { getFavoritesList, loadfavoritesList } from '../../store/favorites';
import { getUser } from '../../store/user';
import CardTitle from '../ui/cardProduct/cardTitle';

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser());
  const favoritesList = useSelector(getFavoritesList());

  useEffect(() => {
    dispatch(loadfavoritesList());
  }, [user]);

  return (
    <div className='container'>
      <h2>Избранное</h2>
      <div className="col-12">
        { favoritesList.length === 0
          ? <CardTitle>Нет избранных товаров.</CardTitle>
          : favoritesList.map(product => <CardHorizontal key={ product._id } element={ product } />) }
      </div>
    </div>
  );
};

export default Favorites;
