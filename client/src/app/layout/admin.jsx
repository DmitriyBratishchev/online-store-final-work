import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import AdminCatalogPage from '../components/page/admin/adminCatalog';
import AdminCategoryPage from '../components/page/admin/adminCategory/adminCategoryPage';
import NavAdmin from '../components/page/admin/navAdmin';
import { getCurrentUserId, loadCurrentUser } from '../store/user';

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  history.location.state = '/admin';
  const currentUser = useSelector(getCurrentUserId());
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, []);
  return (
    <div className='container'>
      { currentUser ? <h1>User: { currentUser }</h1> : <h1>Не авторизован</h1> }
      <NavAdmin />
      <Switch>
        <Route path={ '/admin/catalog' } component={ AdminCatalogPage } />
        <Route path={ '/admin/category' } component={ AdminCategoryPage } />
      </Switch>
    </div>
  );
};

export default Admin;
