import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, useField } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import ReactDatepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // react datepicker css

import api from '../../services/api';

import logo from '../../assets/images/logo.jpeg';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('* O nome do cliente é obrigatório'),
  date: Yup.date()
    .typeError('* A data da entrega é obrigatória')
    .required(),
  start_point: Yup.string().required('* O local de partida é obrigatório'),
  end_point: Yup.string().required('* O local da entrega é obrigatório'),
});

const DatePicker = ({ name }) => {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name); // the name of the prop in form object is used here
  const [selectedDate, setSelectedDate] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [fieldName]);

  return (
    <>
      <ReactDatepicker
        id="datepicker"
        name={fieldName}
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        placeholderText="Data da Entrega"
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
};

function Main({ history }) {
  async function registerOrder(data) {
    try {
      await api.post('/deliveries', {
        name: data.name,
        date: data.date,
        start_point: data.start_point,
        end_point: data.end_point,
      });
      history.push('/list');
    } catch (err) {
      toast.error(
        'Falha na requisição. Verifique seus dados e tente novamente.'
      );
      console.log(err);
    }
  }

  return (
    <Container>
      <div className="form-style">
        <img src={logo} alt="unicad" />

        <Form schema={schema} onSubmit={registerOrder}>
          <Input type="text" name="name" placeholder="Nome do Cliente" />
          <DatePicker name="date" />
          <Input
            type="text"
            name="start_point"
            placeholder="Ponto de partida"
          />
          <Input type="text" name="end_point" placeholder="Ponto de chegada" />
          <button default type="submit">
            Registrar entrega
          </button>
        </Form>
        <Link to="/list">Ir para a lista de entregas</Link>
      </div>
    </Container>
  );
}

Main.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Main);
