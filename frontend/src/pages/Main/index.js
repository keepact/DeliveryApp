import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function Main() {
  const [orders, setOrders] = useState('');

  async function loadOrders() {
    const response = await api.get('/clients/1/addresses');
    console.log(response);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return <h1>Main</h1>;
}
