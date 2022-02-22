import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import imageService from '../../../services/image.service';
import config from '../../../configFile.json';
import fileStyle from './fileField.module.css';

const FileField = ({ label, name, value, onChange, onChangeFile }) => {
  const fileInput = useRef();
  // const [fileLink, setFileKink] = useState([]);

  const handleChangeFile = (event) => {
    // console.log('form file', event);
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.target.files];
    files.forEach(async (oneOfImages) => {
      onChangeFile(oneOfImages);
    });
  };

  const handleDrop = (event) => {
    // console.log('files drop', event);
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    // console.log('files drop', files);
    files.forEach(async (oneOfImages) => {
      onChangeFile(oneOfImages);
    });
  };

  // console.log('fileStyle', fileStyle);
  // console.log('file array', fileLink);
  // console.log('fileInput.current', fileInput.current?.files);
  const handleDelete = async (event, image) => {
    event.preventDefault();
    try {
      console.log('delete click', event, image);
      const deletedFile = await imageService.remove(image);
      console.log('deleted File', deletedFile);
      const newImageArray = value.filter(i => i !== deletedFile);
      onChange({ name, value: newImageArray });
    } catch (error) {
      console.log('error delete', error);
    }
  };

  const hendleDragEnter = (event) => {
    console.log('hendleDragEnter');
    event.preventDefault();
    event.stopPropagation();
  };

  const hendleDragLeave = (event) => {
    console.log('hendleDragLeave');
    event.preventDefault();
    event.stopPropagation();
  };

  const hendleDragOver = (event) => {
    console.log('hendleDragOver');
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className=""
      onDrop={ handleDrop }
      onDragEnter={ hendleDragEnter } onDragLeave={ hendleDragLeave } onDragOver={ hendleDragOver }
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
        <div className={ fileStyle.fotoContainer } >
          { value.length !== 0 && value.map((image) => {
            return (
              <div
                key={ image }
                className={ fileStyle.foto }
                style={ { 'background-image': `url(${config.apiImages + image})` } }
              >
                <div role={ 'button' } type='button' className={ fileStyle.delete } onClick={ (e) => handleDelete(e, image) }><i className="bi bi-x-circle-fill text-danger"></i></div>
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
