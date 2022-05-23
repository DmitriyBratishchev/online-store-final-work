import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCatalogElement, getCatalogList, loadCatalogList } from '../../../../store/catalog';
import { loadCurrentUser } from '../../../../store/user';
import _ from 'lodash';
import AdminCatalogForm from './adminCatalogForm';
import AdminCatalogTable from './admitCatalogTable';

const AdminCatalogPage = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(getCatalogList());
  const [editData, setEditData] = useState({});
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  useEffect(() => {
    dispatch(loadCatalogList());
    dispatch(loadCurrentUser());
  }, []);

  const handleEdit = (item) => {
    setEditData(item);
  };

  const handleDelete = (item) => {
    dispatch(deleteCatalogElement(item));
    setEditData({});
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const catalogAfterSort = _.orderBy(catalog, [sortBy.path], [sortBy.order]);
  return (
    <>
      <div className="d-flex">
        <div className="col-3 pe-4">
          <AdminCatalogForm
            editData={ editData }
          />
        </div>
        <div className="col-9">
          <h2>Список товаров</h2>
          { catalog.length === 0 ? <h3>Загрузка ...</h3> :
            <AdminCatalogTable
              onSort={ handleSort }
              selectedSort={ sortBy }
              handleDelete={ handleDelete }
              handleEdit={ handleEdit }
              catalog={ catalogAfterSort }
            />
          }
        </div>
      </div></>
  );
};

export default AdminCatalogPage;
