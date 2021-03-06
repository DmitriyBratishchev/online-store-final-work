import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createCatalogElement, updatedCatalogElement } from '../../../../store/catalog';
import { getCategories, loadCategoriesList } from '../../../../store/categories';
import { validator } from '../../../../utils/validator';
import NumberField from '../../../common/form/numberField';
import SelectField from '../../../common/form/selectField';
import TextField from '../../../common/form/textField';
import imageService from '../../../../services/image.service';
import FileField from '../../../common/form/fileField';
import TextAreaField from '../../../common/form/textAreaField';

const AdminCatalogForm = ({ editData = {} }) => {
  const initialData = {
    name: '',
    price: 0,
    description: '',
    numberOfGoods: 0,
    category: '',
    images: []
  };
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const [data, setData] = useState(initialData);
  const [isEdit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  useEffect(() => {
    if (Object.keys(editData).length === 0) {
      setEdit(false);
      setData(initialData);
    } else {
      setEdit(true);
      setData(editData);
    }
  }, [editData]);

  const cancelEdit = () => {
    setEdit(false);
    setData(initialData);
  };

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

  const handleChangeFile = async (file) => {
    const image = await imageService.post(file);
    setData((prev) => ({
      ...prev,
      images: [...prev.images, image]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(isEdit ? updatedCatalogElement(data) : createCatalogElement(data));
    if (!isEdit) {
      setData(initialData);
    };
  };
  return (
    <>
      { isEdit
        ? <div className='d-flex justify-content-between'>
          <h3>Изменить</h3>
          <i className="bi bi-file-earmark-plus fs-3 text-primary" onClick={ cancelEdit } role='button'></i>
        </div>
        : <h3>Создать</h3> }
      <form onSubmit={ handleSubmit } noValidate encType='multipart/form-data'>
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
          onFocus={ handleFocus }
          error={ errors.category }
          required={ true }
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
        <TextAreaField
          label='Описание товара'
          name='description'
          value={ data.description }
          onChange={ handleChange }
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
        <FileField
          label='Фотографии товара.'
          name='images'
          value={ data.images }
          onChange={ handleChange }
          onChangeFile={ handleChangeFile }
        />
        <button disabled={ !isValid } className='btn btn-primary w-100 mx-auto'>
          { isEdit ? 'Сохранить изменения' : 'Добавить товар' }
        </button>
      </form>
    </>
  );
};

AdminCatalogForm.propTypes = {
  editData: PropTypes.object
};

export default AdminCatalogForm;
