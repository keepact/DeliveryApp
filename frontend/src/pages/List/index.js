import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import { Container, DeliveryTable } from './styles';

export default function Main() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    const response = await api.get('/deliveries');

    const data = response.data.map(order => ({
      ...order,
      dateFormatted: format(parseISO(order.date), "dd'/'M/Y"),
    }));

    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Container>
      <DeliveryTable>
        <thead>
          <tr>
            <th>Número da entrega</th>
            <th>Data da entrega</th>
            <th>Nome do Cliente</th>
            <th>Ponto Inicial</th>
            <th>Ponto Final</th>
          </tr>
        </thead>
        {orders.map(delivery => (
          <tbody key={delivery.id}>
            <tr>
              <td>
                <span>#00{delivery.id}</span>
              </td>
              <td>
                <span>{delivery.dateFormatted}</span>
              </td>
              <td>
                <span>{delivery.name}</span>
              </td>
              <td>
                <span>{delivery.start_point}</span>
              </td>
              <td>
                <span>{delivery.end_point}</span>
              </td>
            </tr>
          </tbody>
        ))}
      </DeliveryTable>
    </Container>
  );
}
