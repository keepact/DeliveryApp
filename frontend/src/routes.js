import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import List from './pages/List';
import MapContainer from './pages/Map';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/list" component={List} />
      <Route path="/map" component={MapContainer} />
    </Switch>
  );
}
