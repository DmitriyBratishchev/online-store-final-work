import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Mousewheel, EffectCube, Autoplay, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PropTypes from 'prop-types';
import config from '../../../configFile.json';
// import classNames from 'classnames';
import style from './swiper.module.css';
import { getRandomNumber } from '../../../utils/getRandomNumber';

function SwiperCart({ images }) {
  // const swiper = useSwiper();
  // console.log(swiper);
  const randomDelay = getRandomNumber(1000, 4000);
  return (
    <Swiper
      modules={ [Navigation, Pagination, Scrollbar, Mousewheel, EffectCube, Autoplay, Zoom] }
      // effect='cube'
      mousewheel
      loop
      zoom={ { maxRatio: 10 } }
      onMouseEnter={ () => console.log('mouseIn') }
      spaceBetween={ 5 }
      slidesPerView={ 1 }
      navigation={ { nextEl: '.nextSlide' } }
      autoplay={ { delay: randomDelay, disableOnInteraction: false } }
      pagination={ { clickable: true, dynamicBullets: true } }
      // scrollbar={ { draggable: true } }
      // onSwiper={ (swiper) => console.log('swiper', swiper.autoplay.start()) }
      // onSlideChange={ (swiper) => console.log('onSlideChange', swiper.autoplay.stop()) }
      onClick={ (swiper) => console.log('onClick', swiper.autoplay.start()) }

    >
      { images.map((image) => {
        console.log('child', image);
        return (
          <SwiperSlide key={ image } className={ style.foto }>
            <img className={ style.foto } src={ config.apiImages + image } alt="foto" />
          </SwiperSlide>
        );
      }) }
      <button className='nextSlide'>v</button>
    </Swiper>
  );
}

SwiperCart.propTypes = {
  images: PropTypes.array
};

export default SwiperCart;
