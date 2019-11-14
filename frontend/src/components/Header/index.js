import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../assets/images/logo.jpeg';

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="unicad" height="160" width="160" />
      </Link>
    </Container>
  );
}
