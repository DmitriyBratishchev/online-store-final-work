import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Mousewheel, EffectCube, Autoplay, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PropTypes from 'prop-types';
import config from '../../../configFile.json';
import style from './swiper.module.css';
import { getRandomNumber } from '../../../utils/getRandomNumber';

function SwiperCart({ images, propClassName }) {
  const randomDelay = getRandomNumber(1000, 4000);
  return (
    <Swiper
      modules={ [Navigation, Pagination, Scrollbar, Mousewheel, EffectCube, Autoplay, Zoom] }
      mousewheel
      loop
      zoom={ { maxRatio: 1.3 } }
      spaceBetween={ 5 }
      slidesPerView={ 1 }
      autoplay={ { delay: randomDelay, disableOnInteraction: false } }
      pagination={ { clickable: true, dynamicBullets: true } }
      onClick={ swiper => swiper.autoplay.start() }
    >
      { images.map((image) => {
        return (
          <SwiperSlide key={ image } className={ style.foto }>
            <div className='swiper-zoom-container'>
              <img className={ style.foto + ` ${propClassName}` + ' swiper-slide-zoomed' } src={ config.apiImages + image } alt="foto" />

            </div>
          </SwiperSlide>
        );
      }) }
    </Swiper>
  );
}

SwiperCart.propTypes = {
  images: PropTypes.array,
  propClassName: PropTypes.string
};

export default SwiperCart;
