import React, { useEffect, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import NumberField from './numberField';

const RangeField = ({ min, max, interval, onAfterChange }) => {
  const [changeValue, setChangeValue] = useState([min, max]);

  useEffect(() => setChangeValue(interval), [interval, min, max]);

  const handleChangePrice = (num) => {
    setChangeValue(num);
  };

  const handleMin = ({ value }) => {
    const newInterval = value > changeValue[1] ? [value, value] : [value, changeValue[1]];
    setChangeValue(newInterval);
    onAfterChange(newInterval);
  };
  const handleMax = ({ value }) => {
    const newInterval = value < changeValue[0] ? [value, value] : [changeValue[0], value];
    setChangeValue(newInterval);
    onAfterChange(newInterval);
  };
  const handleChangeAfter = (num) => {
    onAfterChange(num);
  };
  const marks = {
    [min]: {
      style: {
        position: 'absolute',
        fontSize: '1.2rem',
        color: '#666666',
        fontWeigth: 800,
        right: '100%',
        transform: `translateX(-10px)`
      },
      label: <span>{ min }</span>
    },
    [max]: {
      style: {
        position: 'absolute',
        fontSize: '1.2rem',
        color: '#666666',
        fontWeigth: 800,
        left: '100%'
      },
      label: <div style={ { transform: `translateX(-20%)` } }>{ max }</div>
    }
  };

  return (
    <>
      <div style={ { width: '90%', margin: '5px 5% 40px' } }>
        <Slider
          range={ true }
          value={ changeValue }
          defaultValue={ interval }
          min={ min }
          max={ max }
          marks={ marks }
          draggableTrack
          pushable
          onChange={ handleChangePrice }
          onAfterChange={ handleChangeAfter }
          dotStyle={ { borderColor: '#999999', height: 9, width: 3 } }
          trackStyle={ { backgroundColor: 'var(--bs-blue)', height: 6, cursor: 'e-resize' } }
          handleStyle={ {
            borderColor: 'var(--bs-blue)',
            height: 18,
            width: 18,
            marginLeft: 0,
            marginTop: -6,
            backgroundColor: 'black'
          } }
        />
        <div className='d-flex justify-content-between mt-5'>
          <div className='w-50'>
            <NumberField
              className='mb-0'
              value={ changeValue[0] }
              onChange={ handleMin }
            />
          </div>
          <div className="mx-2 my-auto">-</div>
          <div className='w-50'>
            <NumberField
              className='mb-0'
              value={ changeValue[1] }
              onChange={ handleMax }
            />
          </div>

        </div>
      </div>

    </>
  );
};

RangeField.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  interval: PropTypes.arrayOf(number),
  onAfterChange: PropTypes.func
};

export default RangeField;
