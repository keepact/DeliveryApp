import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import List from './pages/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/list" component={List} />
    </Switch>
  );
}
