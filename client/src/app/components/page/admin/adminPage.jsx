import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCatalogElement, getCatalogList, loadCatalogList } from '../../../store/catalog';
import AdminForm from './adminForm';
import AdmitCatalogTable from './admitCatalogTable';

const AdminPage = () => {
  const dispatch = useDispatch();
  const catalog = useSelector(getCatalogList());
  const [editData, setEditData] = useState({});
  useEffect(() => {
    dispatch(loadCatalogList());
  }, []);

  const handleEdit = (item) => {
    console.log('item', item);
    setEditData(item);
  };

  const handleDelete = (item) => {
    dispatch(deleteCatalogElement(item));
    setEditData({});
  };

  console.log('catalog', catalog);
  console.log('editData', editData);
  // if (catalog.length === 0) return <h3>Загрузка ...</h3>;
  return (
    <><h2>Admin</h2>
      <div className="d-flex">
        <div className="col-3 me-4">
          <AdminForm
            editData={ editData }
          />
        </div>
        <div className="col-9">
          <h2>Список товаров</h2>
          { catalog.length === 0 ? <h3>Загрузка ...</h3> :
            <AdmitCatalogTable
              handleDelete={ handleDelete }
              handleEdit={ handleEdit }
              catalog={ catalog }
            />
          }
        </div>
      </div></>
  );
};

export default AdminPage;
