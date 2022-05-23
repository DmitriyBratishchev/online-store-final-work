import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAuthError, getAuthError, signUp } from '../../store/user';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthError());
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
    dispatch(deleteAuthError());
  };

  const handleFocus = ({ target }) => {
    setErrors((prev) => {
      delete prev[`${target.name}`];
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(signUp(data));
  };
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
      { loginError && <p className='text-danger'>{ loginError }</p> }
      <button disabled={ !isValid } className='btn btn-primary w-100 mx-auto'>
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
