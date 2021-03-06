import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import imageService from '../../../services/image.service';
import fileStyle from './fileField.module.css';

const imageApi = process.env.REACT_APP_API_IMAGES;

const FileField = ({ label, name, value, onChange, onChangeFile }) => {
  const fileInput = useRef();
  const dragContainer = useRef();
  const [dragIndex, setDragIndex] = useState(null);
  const [valueOnDragable, setValueOnDragable] = useState();

  useEffect(() => setValueOnDragable(value), [value]);

  const handleChangeFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.target.files];
    files.forEach(async (oneOfImages) => {
      onChangeFile(oneOfImages);
    });
  };

  const handleDelete = async (event, image) => {
    event.preventDefault();
    try {
      const deletedFile = await imageService.remove(image);
      const newImageArray = value.filter(i => i !== deletedFile);
      onChange({ name, value: newImageArray });
    } catch (error) {
    }
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    if (index === undefined && dragIndex !== null) {
      return setValueOnDragable(value);
    };
    if (dragIndex === null) {
      const files = [...event.dataTransfer.files];
      if (files.length !== 0) {
        files.forEach(async (oneOfImages) => {
          onChangeFile(oneOfImages);
        });
      }
    };
    if (index !== undefined && dragIndex !== null) {
      const newValue = [...value];
      newValue.splice(index >= dragIndex ? index + 1 : index, 0, newValue[dragIndex]);
      newValue.splice(index >= dragIndex ? dragIndex : dragIndex + 1, 1);
      setDragIndex(null);
      onChange({ name, value: newValue });
    }
  };

  const fileDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const fileDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const fileDragOver = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    if (index !== undefined && dragIndex !== null) {
      const newValue = [...value];
      newValue.splice(index >= dragIndex ? index + 1 : index, 0, newValue[dragIndex]);
      newValue.splice(index >= dragIndex ? dragIndex : dragIndex + 1, 1);
      setValueOnDragable(newValue);
    }
  };

  const imageDragStart = (e, index) => {
    setDragIndex(index);
  };

  return (
    <div className=""
      onDrop={ handleDrop }
      onDragEnter={ fileDragEnter }
      onDragLeave={ fileDragLeave }
      onDragOver={ fileDragOver }
    >
      <label htmlFor={ name } className={ fileStyle.label }>{ label }
        <input
          multiple
          type='file'
          id={ name }
          name={ name }
          className={ fileStyle.inputHidden }
          ref={ fileInput }
          onChange={ (e) => handleChangeFile(e) }
        />
        { value.length > 1 && <div style={ { opacity: '.8' } }>?????????????? ?????????????????????? ???????? ?????????? ???????????????? ??????????????????????????????.</div> }
        <div className={ fileStyle.fotoContainer } ref={ dragContainer }>
          { value.length !== 0 && valueOnDragable.map((image, index) => {
            return (
              <div
                key={ image }
                draggable
                onDragStart={ e => imageDragStart(e, index) }
                onDragOver={ e => fileDragOver(e, index) }
                onDrop={ e => handleDrop(e, index) }
                className={ fileStyle.fotoCard }
              >
                <div className={ fileStyle.foto } style={ { backgroundImage: `url(${imageApi + image})` } }>
                </div>
                <div role={ 'button' } type='button' className={ fileStyle.delete } onClick={ (e) => handleDelete(e, image) }><i className="bi bi-x-circle-fill text-danger"></i></div>
                <div className={ fileStyle.indexNumber } >{ index + 1 }</div>
              </div>
            );
          }) }
        </div>
      </label>
    </div>
  );
};

FileField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.array,
  onChange: PropTypes.func,
  onChangeFile: PropTypes.func
};

export default FileField;
