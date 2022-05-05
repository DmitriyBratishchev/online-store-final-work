import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBasketLength, loadCurrentUser, logOut } from '../../store/user';
import Avatar from './avatar';
import style from './navBar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const count = useSelector(getBasketLength());
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [count]);
  return (
    <nav className='sticky-top navbar navbar-expand navbar-dark bg-primary'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse navbar-nav' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/'>Главная</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/catalog' >Каталог</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/admin' >Админ</Link>
            </li>
          </ul>
          {/* <form className='d-flex'>
            <input className='form-control me-2' type='search' placeholder='Поиск' aria-label='Search' />
            <button className='btn btn-outline-success text-white' type='submit'>Найти</button>
          </form> */}
          <div className="nav-item">
            <Link className='nav-link' style={ { position: 'relative' } } to='/basket'>
              Корзина
              <span className={ style.basketCount }>{ count }</span>
            </Link>
          </div>
          <div className='navbar-nav nav-item dropdown ms-4'>
            <Link className='nav-link dropdown-toggle text-white' to={ '#' } id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <Avatar width='30' />
            </Link>
            <ul className='dropdown-menu dropdown-menu-end' aria-labelledby='navbarDropdown'>
              <li><Link className='dropdown-item' to={ '/login' }>Вход/Регистрация</Link></li>
              {/* <li><Link className='dropdown-item' to={ '/login/register' }>Регистрация</Link></li> */ }
              <li><Link className='dropdown-item' to={ '#' }>Настройки</Link></li>
              <li><hr className='dropdown-divider' /></li>
              <li onClick={ () => dispatch(logOut()) }>Выход</li>
            </ul>
          </div>
        </div >
      </div >
    </nav >
  );
};

export default NavBar;
