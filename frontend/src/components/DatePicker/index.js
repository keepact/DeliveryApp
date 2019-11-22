import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useEffect(() => {
    const datePickers = document.getElementsByClassName(
      'react-datepicker__input-container'
    );
    Array.from(datePickers).forEach(el =>
      el.childNodes[0].setAttribute('readOnly', true)
    );
  }, []);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        placeholderText="Data da entrega"
        onChange={date => setSelected(date)}
        ref={ref}
      >
        {' '}
      </ReactDatePicker>
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DatePicker;
