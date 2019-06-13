import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { SearchContainer, EventDetails } from './components';

const Router = () => (
  <Switch>
    <Route exact path="/" component={SearchContainer} />
    <Route exact path="/search" component={SearchContainer} />
    <Route exact path="/event/:id" component={EventDetails} />
    <Route exact path="/artist/:id" component={SearchContainer} />
  </Switch>
);

export default Router;
