import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../configFile.json';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import style from './cardHorizontal.module.css';
import SwiperCart from '../../common/swiper/swiperCart';
import { editBasket, editFavorit, getCountByIdProduct, getIsFavoritById } from '../../../store/user';
import Category from '../category';
import CardTitle from './cardTitle';
import SliceText from './sliceText';

const CardHorizontal = ({ element }) => {
  const dispatch = useDispatch();
  const countBasket = useSelector(getCountByIdProduct(element._id));
  const isFavorit = useSelector(getIsFavoritById(element._id));

  const incrementBasket = (id) => {
    dispatch(editBasket({ _id: id, count: countBasket + 1 }));
  };
  const decrementBasket = (id) => {
    dispatch(editBasket({ _id: id, count: countBasket - 1 }));
  };
  const removeBasket = (id) => {
    dispatch(editBasket({ _id: id, count: 0 }));
  };

  const handleFavorites = (id) => {
    dispatch(editFavorit(id));
  };

  return (
    <>
      <div className={ `d-flex justify-content-center border border-secondary border-3 p-4 mb-2 w-100 ` }>
        <div className={ classNames(style.image_card) }>
          { !element?.images || element.images.length === 0
            ? <img src='image/no-img.png' alt="foto" width="200px" height="200px" />
            : element.images.length === 1
              ? <img className={ style.foto } src={ config.apiImages + element.images[0] } alt="foto" />
              : (
                <SwiperCart
                  images={ element.images }
                  propClassName={ style.foto }
                />

              )
          }
        </div>
        <div className="d-flex mx-3">
          <div className="collumn">
            <CardTitle >Название: { element.name || '-' }</CardTitle>
            <CardTitle style={ { opacity: 0.7 } }>Категория: <Category _id={ element.category } /></CardTitle>
            <span className='fs-4 lh-1' >Описание:</span>
            <span className='ms-2' >
              <SliceText text={ element.description } />
            </span>
            <p>Осталось на складе: { element.numberOfGoods || 0 }</p>
          </div>
        </div>
        <div className="d-flex flex-column col-4 justify-content-between ms-auto position-relative">
          <CardTitle className='text-primary mb-auto'>{ element.price || 0 } руб.</CardTitle>
          { countBasket > 0 ?
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button
                  type="button"
                  className="btn btn-outline-primary p-2 px-2 lh-1"
                  onClick={ () => decrementBasket(element._id) }
                >
                  -
                </button>
                <CardTitle className='mx-3'> { countBasket } шт</CardTitle>
                <button
                  type="button"
                  className="btn btn-outline-primary p-2 px-2 lh-1"
                  onClick={ () => incrementBasket(element._id) }
                >
                  +
                </button>
              </div>
              <button className='btn btn-success p-2' onClick={ () => removeBasket(element._id) }>Удалить из корзины</button>
            </div>
            :
            <button className='btn btn-success p-2 mb-2 w-100' onClick={ () => incrementBasket(element._id) }>В корзину</button>
          }
          <div
            role="button"
            className='position-absolute end-0 mb-2 fs-4 pe-2 cursor-pointer'
            onClick={ () => handleFavorites(element._id) }
          >
            { isFavorit ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i> }
          </div>
        </div>
      </div>
    </>
  );
};

CardHorizontal.propTypes = {
  element: PropTypes.object
};

export default CardHorizontal;
