import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
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
      console.log(err);
    }
  }

  return (
    <Container>
      <div>
        <img src={logo} alt="unicad" />

        <Form schema={schema} onSubmit={registerOrder}>
          <Input type="text" name="name" placeholder="Nome do Cliente" />
          <Input type="date" name="date" />
          <Input
            type="text"
            name="start_point"
            placeholder="Ponto de partida"
          />
          <Input type="text" name="end_point" placeholder="Ponto de chegada" />
          <button type="submit">Registrar entrega</button>
        </Form>
      </div>
    </Container>
  );
}

export default withRouter(Main);
