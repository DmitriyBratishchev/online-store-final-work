import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCatalogList } from '../store/catalog';
import Card from '../components/page/catalog/card';

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
          <div className='d-flex flex-wrap grid-1 justify-content-around'>
            { catalog.length !== 0 && catalog.map(element => {
              return <Card key={ element.id } element={ element } />;
            }) }
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
