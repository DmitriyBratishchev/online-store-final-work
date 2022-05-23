import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { validator } from '../../../../utils/validator';
import TextField from '../../../common/form/textField';
import { createCategory, updatedCategory } from '../../../../store/categories';

const AdminCategoryForm = ({ editData = {} }) => {
  const initialData = {
    name: ''
  };
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);
  const [isEdit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

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
    dispatch(isEdit ? updatedCategory(data) : createCategory(data));
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
          label='Название категории'
          name='name'
          placeholder='Введите название категории'
          value={ data.name }
          onChange={ handleChange }
          onFocus={ handleFocus }
          error={ errors.name }
          required={ true }
        />
        <button disabled={ !isValid } className='btn btn-primary w-100 mx-auto'>
          { isEdit ? 'Сохранить изменения' : 'Добавить категорию' }
        </button>
      </form>
    </>
  );
};

AdminCategoryForm.propTypes = {
  editData: PropTypes.object
};

export default AdminCategoryForm;
