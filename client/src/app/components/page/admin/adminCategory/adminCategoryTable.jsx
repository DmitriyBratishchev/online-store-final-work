import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../common/table/table';
// import Category from '../../../ui/category';

const AdminCategoryTable = ({ category, handleEdit, onSort, selectedSort }) => {
  const columns = {
    id: {
      name: 'id'
      // iter: 'id'
    },
    name: {
      name: 'Название',
      path: 'name'
    },
    edit: {
      name: 'Редактировать',
      component: (item) => {
        return (
          <button type='button' className='btn btn-outline-primary py-0 me-3' onClick={ () => handleEdit(item) }>
            <i className="bi bi-pen"></i>{ ' ' }Редактировать
          </button>
        );
      }
    }
  };

  return (
    <Table
      onSort={ onSort }
      selectedSort={ selectedSort }
      columns={ columns }
      data={ category }
    />
  );
};

AdminCategoryTable.propTypes = {
  category: PropTypes.array,
  handleEdit: PropTypes.func,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object
};

export default AdminCategoryTable;
