import React from 'react';
import { Link } from 'react-router-dom';

const NavAdmin = () => {
  return (
    <div className='d-flex'>
      <div className="col-3"></div>
      <div className="col-9 mb-2">
        <Link to='/admin/catalog' className='fs-3 py-0 btn btn-outline-primary me-4'>Каталог</Link>
        <Link to='/admin/category' className='fs-3 py-0 btn btn-outline-primary me-4'>Категории</Link>
      </div>
    </div>
  );
};

export default NavAdmin;
