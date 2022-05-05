import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCatalogList } from '../store/catalog';
import { loadCategoriesList } from '../store/categories';
import CatalogList from '../components/page/catalog/catalogList';
import { loadCurrentUser } from '../store/user';
// import { FreeMode, Mousewheel, Scrollbar } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

const Catalog = () => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catalog.entities);
  console.log('catalog in component', catalog);

  useEffect(() => {
    dispatch(loadCurrentUser());
    dispatch(loadCatalogList());
    dispatch(loadCategoriesList());
  }, []);
  return (
    <>
      <div className='container w-100 bg-light grow-1'>
        <h1>Каталог</h1>
        <div className='d-flex justify-content-between ms-auto me-auto'>
          <div className='col-2 bg-danger m-2 me-4' style={ { maxHeight: '40vh', position: 'sticky', top: '5rem', cursor: 'url(image/alarm.svg), pointer' } }>
            <div className="animate-wisible"></div>
            <h3 className='p-2'>Сортировка</h3>
          </div>
          {/* <div className="animate-wisible"> */ }
          <CatalogList catalog={ catalog } />

          {/* </div> */ }
        </div>
      </div>
    </>
  );
};

export default Catalog;
