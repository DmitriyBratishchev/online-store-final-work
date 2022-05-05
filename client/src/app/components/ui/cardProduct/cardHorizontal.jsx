import React from 'react';
import PropTypes from 'prop-types';
import config from '../../../configFile.json';
// import Avatar from '../../ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import style from './cardHorizontal.module.css';
import SwiperCart from '../../common/swiper/swiperCart';
import { editBasket, getCountByIdProduct } from '../../../store/user';
import Category from '../category';
import CardTitle from './cardTitle';

const CardHorizontal = ({ element, animationDelay = 0.2 }) => {
  const dispatch = useDispatch();
  // const cardWisible = useRef(null);
  const countBasket = useSelector(getCountByIdProduct(element._id));

  const incrementBasket = (id) => {
    dispatch(editBasket({ _id: id, count: countBasket + 1 }));
  };
  const decrementBasket = (id) => {
    console.log('count basket in decrement', countBasket);
    dispatch(editBasket({ _id: id, count: countBasket - 1 }));
  };
  // const removeBasket = (id) => {
  //   dispatch(editBasket({ _id: id, count: 0 }));
  // };
  console.log('countBasket id: ', element._id, ' = ', countBasket);
  return (
    <>
      <div style={ { animationDelay: `${animationDelay}s` } } className={ `d-flex justify-content-center border border-secondary border-3 p-4 m-2 w-100 ${style.wisible}` }>
        <div className={ classNames(style.image_card) }>
          { element.images.length === 0
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
        <div className="d-flex ms-3 me-auto">
          <div className="collumn">
            <CardTitle >Название: { element.name }</CardTitle>
            <CardTitle style={ { opacity: 0.5 } }>Категория: <Category _id={ element.category } /></CardTitle>
            <p>Цена:  </p>
            <p>Осталось на складе: { element.numberOfGoods }</p>
          </div>
        </div>
        <div className="d-flex flex-column col-4 justify-content-between">
          {/* <div className="collumn"> */ }
          <CardTitle className='text-primary mb-auto'>{ element.price } руб.</CardTitle>
          { countBasket > 0 ?
            <div className="d-flex justify-content-between">
              <h2 className=''>В корзине</h2>
              <div className="btn-group mb-3" role="group" aria-label="Basic outlined example">
                <button
                  type="button"
                  className="btn btn-outline-primary fs-3 p-1 px-2 lh-1"
                  onClick={ () => decrementBasket(element._id) }

                >
                  -
                </button>
                <CardTitle className='mx-3'> { countBasket } шт</CardTitle>
                <button
                  type="button"
                  className="btn btn-outline-primary fs-3 p-1 px-2 lh-1"
                  onClick={ () => incrementBasket(element._id) }
                >
                  +
                </button>
              </div>
            </div>
            :
            <button className='btn btn-success p-2 mb-2 w-100' onClick={ () => incrementBasket(element._id) }>В корзину</button>

          }
          {/* { countBasket === 0 ?
            : <button className='btn btn-success p-2 mb-2 w-100' onClick={ () => removeBasket(element._id) }>Удалить из корзины</button>

          } */}
          <button className='btn btn-success p-2 mb-2 w-100'>В избранное</button>
          {/* </div> */ }
        </div>

      </div>
    </>
  );
};

CardHorizontal.propTypes = {
  element: PropTypes.object,
  animationDelay: PropTypes.number
};

export default CardHorizontal;
