import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../common/table/table';
import Category from '../../ui/category';

const AdminCatalogTable = ({ catalog, handleEdit, handleDelete }) => {
  const columns = {
    id: {
      name: 'id',
      iter: 'id'
    },
    name: {
      name: 'Название',
      iter: 'name'
    },
    category: {
      name: 'Категория',
      iter: 'category',
      component: (item) => <Category _id={ item.category } />
    },
    price: {
      name: 'Цена',
      iter: 'price'
    },
    numberOfGoods: {
      name: 'Количество',
      iter: 'numberOfGoods'
    },
    edit: {
      name: 'Редактировать',
      component: (item) => {
        return (
          <>
            <button onClick={ () => handleEdit(item) }>
              Edit
            </button>
            <button onClick={ () => handleDelete(item) }>
              del
            </button>
          </>
        );
      }
    }
  };

  console.log('table columns', columns);
  return (
    <Table
      // onSort
      // selectedSort
      columns={ columns }
      data={ catalog }
    />
  );
};

AdminCatalogTable.propTypes = {
  catalog: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
};

export default AdminCatalogTable;
