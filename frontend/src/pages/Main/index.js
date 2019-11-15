import React, { useState } from 'react';
import api from '../../services/api';

import { Container } from './styles';

export default function Main() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  async function registerOrder(e) {
    e.preventDefault();
    try {
      await api.post('/deliveries', {
        name,
        date,
        start_point: start,
        end_point: end,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <div>
        <form onSubmit={registerOrder}>
          <input
            type="text"
            placeholder="Nome do Cliente"
            onChange={e => setName(e.target.value)}
          />
          <input type="date" onChange={e => setDate(e.target.value)} /> />
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
