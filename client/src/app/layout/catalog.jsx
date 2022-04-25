import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCatalogList } from '../store/catalog';
import Card from '../components/page/catalog/card';
// import { FreeMode, Mousewheel, Scrollbar } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

const Catalog = () => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catalog.entities);
  console.log('catalog in component', catalog);

  useEffect(() => {
    dispatch(loadCatalogList());
  }, []);
  return (
    <>
      <div className='container w-100 bg-light grow-1'>
        <h1>Каталог</h1>
        <div className='d-flex justify-content-between ms-auto me-auto'>
          <div className='col-2 bg-danger m-2 me-4' style={ { maxHeight: '40vh', position: 'sticky', top: '3rem' } }>
            <h3 className='p-2'>Сортировка</h3>
          </div>
          {/* <Swiper
            modules={ [Scrollbar, FreeMode, Mousewheel] }
            mousewheel={ { eventsTarget: 'container', sensitivity: 0.5, releaseOnEdges: true } }
            scrollbar={ { el: '.swiper-scrollbar-my' } }
            freeMode={ { enabled: true, sticky: false } }
            height={ 250 }
            // width={ 1000 }
            slidesPerGroup={ 1 }
            speed={ 2000 }
            direction='vertical'
          > */}
          <div className='d-flex flex-wrap grid-1 justify-content-around w-100'>
            { catalog.length !== 0 && catalog.map((element, index) => {
              console.log('catalog, elem №', index);
              return (
                // <SwiperSlide>
                <Card key={ element._id } element={ element } />
              );
            }) }
            {/* </SwiperSlide> */ }

          </div>
          {/* <div className='swiper-scrollbar-my'>hhhh</div> */ }
          {/* </Swiper> */ }
        </div>
      </div>
    </>
  );
};

export default Catalog;
