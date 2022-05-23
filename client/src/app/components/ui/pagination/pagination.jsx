import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { generateNumbersArray } from '../../../utils/generateNumbersArray';
import PaginationButton from './paginationButton';

const Pagination = ({ itemsCount, pageSize, onPageChange, curentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  useEffect(() => {
    onPageChange(pageCount < curentPage ? pageCount || 1 : curentPage);
  }, [pageCount]);
  if (pageCount <= 1) return null;
  const pages = generateNumbersArray(1, pageCount);
  return (
    <div className='btn-group' role={ 'group' }>
      <PaginationButton
        text='&#171;'
        className='fs-2 lh-1 pt-0'
        onPageChange={ () => onPageChange(1) }
      />
      <PaginationButton
        text='&#8249;'
        className='fs-2 lh-1 pt-0'
        onPageChange={ () => onPageChange(curentPage - 1 || 1) }
      />
      { pages.map((pageIndex) => {
        return (
          <PaginationButton
            key={ 'paginationIndex' + pageIndex }
            text={ pageIndex }
            active={ curentPage === pageIndex }
            onPageChange={ () => onPageChange(pageIndex) }
          />
        );
      }) }
      <PaginationButton
        text='&#8250;'
        className='fs-2 lh-1 pt-0'
        onPageChange={ () => onPageChange(pageCount - curentPage ? curentPage + 1 : pageCount) }
      />
      <PaginationButton
        text='&#187;'
        className='fs-2 lh-1 pt-0'
        onPageChange={ () => onPageChange(pageCount) }
      />
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  curentPage: PropTypes.number.isRequired
};

export default Pagination;
