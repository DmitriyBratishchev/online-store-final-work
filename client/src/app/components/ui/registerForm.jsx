import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
// import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router';
import CheckBoxField from '../common/form/checkBoxField';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAuthError, getAuthError, login } from '../../store/users';

const RegisterForm = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  // const loginError = useSelector(getAuthError());
  const [data, setData] = useState({ email: '', password: '', name: '', licence: false });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (!isValid) {
      validate();
    }
  }, [data.licence]);

  const validatorConfig = {
    email: {
      isRequired: {
        // message: 'Это поле обязательно для заполнения'
      },
      isEmail: {
        rule: (data) => !/^\S+@\S+\.\S+$/g.test(data),
        message: 'Неверный формат для Email.'
      }
    },
    password: {
      isRequired: {
        message: 'Поле "пароль" обязательно для заполнения'
      },
      isCapitalSybol: {
        rule: (data) => !/[A-Z]+/g.test(data),
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        rule: (data) => !/\d+/g.test(data),
        message: 'Пароль должен содержать хотя бы одну цифру'
      },
      min: {
        rule: (data) => data.length < 8,
        message: 'Пароль должен состоять минимум из 8 символов'
      }
    },
    licence: {
      isTrue: {
        rule: () => !data.licence,
        message:
          'Вы не можете использовать наш сервис без подтвеждения лицензионного соглашения'
      }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
    // dispatch(deleteAuthError());
  };

  const handleFocus = ({ target }) => {
    setErrors((prev) => {
      delete prev[`${target.name}`];
      return prev;
    });
  };

  const postDb = async (data) => {
    await fetch('http://localhost:4000/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => console.log('res', res)).catch((reas) => console.log('reas', reas)).finally(console.log('finali'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log('isValid', isValid);
    if (!isValid) return;
    await postDb(data);
    const redirect = history.location.state ? history.location.state.from.pathname : '/';
    history.push(redirect);
    console.log('register data', data);

    // dispatch(login({ payload: data, redirect }));
  };
  console.log('error', errors);
  // console.log('hist state', history.location.state?.from?.pathname);
  console.log('reg state', data);
  return (
    <form onSubmit={ handleSubmit }>
      <TextField
        label='Электронная почта'
        placeholder='email'
        name='email'
        required={ true }
        onChange={ handleChange }
        onFocus={ handleFocus }
        value={ data.email }
        error={ errors.email }
      />
      <TextField
        label='Пароль'
        name='password'
        placeholder='password'
        type='password'
        required={ true }
        onChange={ handleChange }
        onFocus={ handleFocus }
        value={ data.password }
        error={ errors.password }
      />
      <TextField
        label='Имя'
        name='name'
        placeholder='Как к Вам обращаться?'
        onChange={ handleChange }
        onClick={ handleFocus }
        value={ data.name }
        error={ errors.name }
      />
      <CheckBoxField
        value={ data.licence }
        onChange={ handleChange }
        name="licence"
        error={ errors.licence }
      >
        Подтвердите <a>лицензионное соглашение</a>
      </CheckBoxField>
      {/* { loginError && <p className='text-danger'>{ loginError }</p> } */ }
      <button disabled={ !isValid } className='btn btn-primary w-100 mx-auto'>
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
