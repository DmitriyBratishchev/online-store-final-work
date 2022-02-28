import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../../../configFile.json';
// import Avatar from '../../ui/avatar';
import { getCategoryNameById, loadCategoriesList } from '../../../store/categories';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import style from './card.module.css';

const Card = ({ element }) => {
  const dispatch = useDispatch();
  const categoryName = useSelector(getCategoryNameById(element.category));
  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center border border-secondary border-3 p-4 m-2 w-100">
        {/* <div className="row"> */ }
        <div className={ classNames(style.image_card) }>
          { element.images.length === 0
            ? <img src='image/no-img.png' alt="foto" width="150px" height="150px" />
            : element.images.map((image) => {
              return <img key={ image } className={ classNames(style.foto) } src={ config.apiImages + image } alt="foto" />;
            })
          }
          {/* <Avatar width='150' /> */ }
        </div>
        <div className="d-flex ms-3 me-auto">
          <div className="collumn">
            <h2>Название: { element.name }</h2>
            <p>Категория: { categoryName }</p>
            <p>Цена: { element.price } руб.</p>
            <p>Осталось на складе: { element.numberOfGoods }</p>
          </div>
        </div>
        <div className="d-flex">
          <div className="collumn">
            <button className='btn btn-success p-2 mb-2 w-100'>В корзину</button>
            <button className='btn btn-success p-2 mb-auto w-100'>В избранное</button>
          </div>
        </div>

      </div>
    </>
  );
};

Card.propTypes = {
  element: PropTypes.object
};

export default Card;
