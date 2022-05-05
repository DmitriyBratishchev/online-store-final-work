import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AdminPage from '../components/page/admin';
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
      <AdminPage />
    </div>
  );
};

export default Admin;
