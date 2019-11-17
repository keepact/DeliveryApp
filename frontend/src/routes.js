import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import List from './pages/List';
import MapContainer from './pages/Map/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/list" exact component={List} />
      <Route path="/list/:id" component={MapContainer} />
    </Switch>
  );
}
