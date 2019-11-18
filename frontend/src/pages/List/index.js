import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, DeliveryTable, PageActions } from './styles';

export default function List() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  // eslint-disable-next-line no-shadow
  async function loadOrders(page = 1) {
    const response = await api.get('/deliveries', {
      params: {
        page,
      },
    });
    const data = response.data.map(order => ({
      ...order,
      dateFormatted: format(parseISO(order.date), "dd'/'M/Y"),
    }));

    setOrders(data);
    setPage(page);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const ordersSize = useMemo(() => orders.length, [orders]);

  function prevPage() {
    if (page === 1) return;
    const pageNumber = page - 1;
    loadOrders(pageNumber);
  }

  function nextPage() {
    if (ordersSize < 10) return;
    const pageNumber = page + 1;
    loadOrders(pageNumber);
  }

  return (
    <>
      <Header />
      <Container>
        <DeliveryTable>
          <thead>
            <tr>
              <th>Número de Registro</th>
              <th>Data da Entrega</th>
              <th>Nome do Cliente</th>
              <th>Ponto Inicial</th>
              <th>Ponto Final</th>
            </tr>
          </thead>
          {orders.map(delivery => (
            <tbody key={delivery.id}>
              <tr>
                <td>
                  <Link to={`/list/${delivery.id}`}>
                    <span>#00{delivery.id}</span>
                  </Link>
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
        <PageActions>
          <button type="button" disabled={page < 2} onClick={prevPage}>
            Anterior
          </button>
          <span>Página {page}</span>
          <button type="button" disabled={ordersSize < 10} onClick={nextPage}>
            Próximo
          </button>
        </PageActions>
      </Container>
    </>
  );
}
