import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );
  const toggleFormType = () => {
    setFormType((prev) => (prev === 'register' ? 'login' : 'register'));
  };
  return (
    <>
      <div className='container'>
        <h1>Login</h1>
        <div className='row mt-5'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            { formType === 'register' ? (
              <>
                <h3 className='mb-2'>Регистрация</h3>
                <div className='text-black-50'>(почта: *@*.**)</div>
                <div className='text-black-50 mb-2'>(пароль: min 1 заглавная буква, min 1 цифра, min 8 символов)</div>
                <RegisterForm />
                <p>
                  У вас уже есть аккаунт?
                  <a className='color-primary' role='button' onClick={ toggleFormType }>
                    { ' ' }
                    Войти
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <h3 className='mb-2'>Login</h3>
                <div className='text-black-50'>(почта: *@*.**)</div>
                <div className='text-black-50 mb-2'>(пароль: min 1 заглавная буква, min 1 цифра, min 8 символов)</div>
                <LoginForm />
                <p>
                  У вас нет аккаунта?
                  <a className='color-primary' role='button' onClick={ toggleFormType }>
                    { ' ' }
                    Регистрация
                  </a>
                  .
                </p>
              </>
            ) }
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
