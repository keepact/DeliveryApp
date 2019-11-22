import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import AutoComplete from '../../components/AutoComplete';

import DatePicker from '../../components/DatePicker';

import api from '../../services/api';

import logo from '../../assets/images/delivery.svg';
import { Container, Wrapper, SubmitButton } from './styles';

const fieldRequired = 'Esse campo é obrigatório';

const schema = Yup.object().shape({
  name: Yup.string().required(fieldRequired),
  date: Yup.date()
    .typeError(fieldRequired)
    .required(fieldRequired),
  start_point: Yup.string().required(fieldRequired),
  end_point: Yup.string().required(fieldRequired),
});

function Main({ history }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  async function registerOrder(data) {
    try {
      await api.post('/deliveries', {
        name: data.name,
        date: data.date,
        start_point: start,
        end_point: end,
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
      <Wrapper>
        <img src={logo} alt="delivery app logo" />

        <Form schema={schema} onSubmit={registerOrder}>
          <Input type="text" name="name" placeholder="Nome do Cliente" />
          <DatePicker name="date" />
          <AutoComplete
            onChange={setStart}
            value={start}
            onSelect={data => setStart(data)}
            placeholder="Ponto de partida"
            name="start_point"
          />
          <AutoComplete
            onChange={setEnd}
            value={end}
            onSelect={data => setEnd(data)}
            placeholder="Ponto de chegada"
            name="end_point"
          />

          <SubmitButton>Registrar entrega</SubmitButton>
        </Form>
        <Link to="/list">Ir para a lista de entregas</Link>
      </Wrapper>
    </Container>
  );
}

Main.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Main);
