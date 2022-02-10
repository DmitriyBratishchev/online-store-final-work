import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Login = () => {
  const { type } = useParams();
  console.log('type', type);
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  );
  console.log('formType', formType);
  const toggleFormType = () => {
    setFormType((prev) => (prev === 'register' ? 'login' : 'register'));
  };
  return (
    <>
      <h1>Login</h1>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            { formType === 'register' ? (
              <>
                <h3 className='mb-4'>Регистрация</h3>
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
                <h3 className='mb-4'>Login</h3>
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
