import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ columns, onSort, selectedSort }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort((selectedSort) => ({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };
  const getIconSort = (item) => {
    return selectedSort?.path !== item
      ? ''
      : selectedSort?.order === 'asc'
        ? <i className='bi bi-caret-up-fill'></i>
        : <i className='bi bi-caret-down-fill'></i>;
  };
  return (
    <thead>
      <tr>
        { Object.keys(columns).map((column) => {
          return (
            <th
              key={ column }
              scope='col'
              onClick={
                columns[column].path
                  ? () => handleSort(columns[column].path)
                  : undefined
              }
              { ...{ role: columns[column].path && 'button' } }
            >
              { columns[column].name }{ ' ' }
              {/* { columns[column].func ? `: ${columns[column].func}` : '' } */ }
              { getIconSort(columns[column].path) }
            </th>
          );
        }) }
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.object,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
