import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCatalogElement } from '../../../store/catalog';
import { getCategories, loadCategoriesList } from '../../../store/categories';
import { validator } from '../../../utils/validator';
import NumberField from '../../common/form/numberField';
import SelectField from '../../common/form/selectField';
import TextField from '../../common/form/textField';

const AdminForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const [data, setData] = useState({
    name: '',
    price: 0,
    numberOfGoods: 0,
    category: ''
  });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  console.log('categories', categories);

  const validatorConfig = {
    name: {
      isRequired: {}
    },
    category: {
      isRequired: {}
    },
    price: {
      isRequired: {
        rule: (data) => data === 0,
        message: 'Укажите стоимость'
      },
      isNumber: {
        rule: (data) => data < 0,
        message: 'Цена не может быть отрицательным числом.'
      }
    },
    numberOfGoods: {
      isNumber: {
        rule: (data) => data < 0,
        message: 'Количество не может быть отрицательным числом.'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFocus = ({ target }) => {
    setErrors((prev) => {
      delete prev[`${target.name}`];
      return prev;
    });
  };

  const handleChange = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
    dispatch(createCatalogElement(data));
  };

  return (
    <form onSubmit={ handleSubmit } noValidate>
      <TextField
        label='Название товара'
        name='name'
        placeholder='Введите название товара'
        value={ data.name }
        onChange={ handleChange }
        onFocus={ handleFocus }
        error={ errors.name }
        required={ true }
      />
      <SelectField
        label='Категория'
        name='category'
        defaultOption='Выберите категорию'
        value={ data.category }
        options={ categories || [] }
        onChange={ handleChange }
        error={ errors.category }
      />
      <NumberField
        label='Стоимость'
        name='price'
        placeholder='Цена'
        value={ data.price }
        onChange={ handleChange }
        onFocus={ handleFocus }
        error={ errors.price }
        required={ true }
      />
      <NumberField
        label='Количество'
        name='numberOfGoods'
        placeholder='0'
        value={ data.numberOfGoods }
        onChange={ handleChange }
        onFocus={ handleFocus }
        error={ errors.numberOfGoods }
      />
      <button disabled={ !isValid } className='btn btn-primary w-100 mx-auto'>
        Отправить
      </button>
    </form>
  );
};

export default AdminForm;
