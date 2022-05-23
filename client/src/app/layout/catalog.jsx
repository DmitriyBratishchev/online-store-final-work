import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CatalogList from '../components/page/catalog/catalogList';
import SortAndFilterLocal from '../components/ui/sortAndFilterLocal/sortAndFilterLocal';
import _ from 'lodash';
import { loadFiltersList, loadPriceFilterInterval } from '../store/filter';
import FilterPanel from '../components/ui/filterPanel/filterPanel';
import { getCatalogListAfterFilterCategory, getCatalogListAfterFilterPrice } from '../store/catalog';

const Catalog = () => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catalog.entities);
  const catalogFilteredCategories = useSelector(getCatalogListAfterFilterCategory(catalog));
  const catalogFilteredPrice = useSelector(getCatalogListAfterFilterPrice(catalogFilteredCategories));
  const [sortBy, setSortBy] = useState({ sortingName: '', order: 'asc' });

  useEffect(() => {
    dispatch(loadFiltersList());
  }, []);

  useEffect(() => {
    dispatch(loadPriceFilterInterval(catalogFilteredCategories));
  }, [JSON.stringify(catalogFilteredCategories)]);

  const handleSort = (params) => {
    setSortBy(prev => ({ ...prev, [params.name]: params.value }));
  };

  const catalogAfterSort = _.orderBy(catalogFilteredPrice, [sortBy.sortingName], [sortBy.order]);

  return (
    <>
      <div className='container w-100 bg-light grow-1'>
        <h1>Каталог</h1>
        <div className='d-flex justify-content-between ms-auto me-auto'>
          <div
            className='col-2 m-2 me-4'
            style={ { maxHeight: '40vh', position: 'sticky', top: '5rem' } }
          >
            <h3 className='p-2'>
              Фильтры
            </h3>
            <FilterPanel />
          </div>
          <div className='w-100'>
            <SortAndFilterLocal
              handleSort={ handleSort }
              sortingName={ sortBy.sortingName }
              order={ sortBy.order }
            />
            <CatalogList catalog={ catalogAfterSort } />
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
