import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ columns, data, children, onSort, selectedSort }) => {
  return (
    <table className='table table-hover table-striped table-bordered'>
      { children || (
        <>
          <TableHeader
            onSort={ onSort }
            selectedSort={ selectedSort }
            columns={ columns }
          />
          <TableBody data={ data } columns={ columns } />
        </>
      ) }
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
};

export default Table;
