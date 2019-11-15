import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/images/logo.jpeg';

import { Container } from './styles';

function Main({ history }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  async function registerOrder(e) {
    e.preventDefault(e);
    try {
      await api.post('/deliveries', {
        name,
        date,
        start_point: start,
        end_point: end,
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

        <form onSubmit={registerOrder}>
          <input
            type="text"
            placeholder="Nome do Cliente"
            onChange={e => setName(e.target.value)}
          />
          <input type="date" onChange={e => setDate(e.target.value)} />
          <input
            type="text"
            placeholder="Ponto de partida"
            onChange={e => setStart(e.target.value)}
          />
          <input
            type="text"
            placeholder="Ponto de chegada"
            onChange={e => setEnd(e.target.value)}
          />
          <button type="submit">Registrar pedido</button>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(Main);
