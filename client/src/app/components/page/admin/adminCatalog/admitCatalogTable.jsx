import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../common/table/table';
import Category from '../../../ui/category';

const AdminCatalogTable = ({ catalog, handleEdit, handleDelete, onSort, selectedSort }) => {
  const columns = {
    id: {
      name: 'id'
    },
    name: {
      name: 'Название',
      path: 'name'
    },
    category: {
      name: 'Категория',
      path: 'category',
      component: (item) => <Category _id={ item.category } />
    },
    price: {
      name: 'Цена',
      path: 'price'
    },
    description: {
      name: 'Описание',
      path: 'description',
      component: (item) => {
        return (
          <div title={ item.description }>{ item.description ? 'наведите для просмотра' : 'нет описания' }</div>
        );
      }
    },
    numberOfGoods: {
      name: 'Количество',
      path: 'numberOfGoods'
    },
    edit: {
      name: 'Редактировать',
      component: (item) => {
        return (
          <div className='d-flex' style={ { marginRight: '-70px' } }>
            <button type='button' className='btn btn-outline-primary py-0 me-3' onClick={ () => handleEdit(item) }>
              <i className="bi bi-pen"></i>{ ' ' }Редактировать
            </button>
            <button type='button' className='btn btn-outline-danger py-0' onClick={ () => handleDelete(item) }>
              <i className="bi bi-trash"></i>{ ' ' }Удалить
            </button>
          </div>
        );
      }
    }
  };

  return (
    <Table
      onSort={ onSort }
      selectedSort={ selectedSort }
      columns={ columns }
      data={ catalog }
    />
  );
};

AdminCatalogTable.propTypes = {
  catalog: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object
};

export default AdminCatalogTable;
