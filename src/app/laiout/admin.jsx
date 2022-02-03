import React from 'react';
import AdminForm from '../components/page/admin/adminForm';

const Admin = () => {
  return (
    <div className='container'>
      <h2>Admin</h2>
      <div className="d-flex">
        <div className="col-3">
          <AdminForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;
