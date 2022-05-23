import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCurrentUser } from '../../../../store/user';
import _ from 'lodash';
import { getCategories, loadCategoriesList } from '../../../../store/categories';
import AdminCategoryForm from './adminCategoryForm';
import AdminCategoryTable from './adminCategoryTable';

const AdminCategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const [editData, setEditData] = useState({});
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  useEffect(() => {
    dispatch(loadCategoriesList());
    dispatch(loadCurrentUser());
  }, []);

  const handleEdit = (item) => {
    setEditData(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const categoriesAfterSort = _.orderBy(categories, [sortBy.path], [sortBy.order]);
  if (categories.length === 0) return <h3>Загрузка ...</h3>;
  return (
    <>
      <div className="d-flex">
        <div className="col-3 pe-4">
          <AdminCategoryForm
            editData={ editData }
          />
        </div>
        <div className="col-9">
          <h2>Список категорий товаров</h2>
          { categories.length === 0 ? <h3>Загрузка ...</h3> :
            <AdminCategoryTable
              onSort={ handleSort }
              selectedSort={ sortBy }
              handleEdit={ handleEdit }
              category={ categoriesAfterSort }
            />
          }
        </div>
      </div>
    </>
  );
};

export default AdminCategoryPage;
