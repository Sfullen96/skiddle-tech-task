import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { SearchContainer, EventContainer, ArtistContainer } from './components';

const Router = () => (
  <Switch>
    <Route exact path="/" component={SearchContainer} />
    <Route exact path="/search" component={SearchContainer} />
    <Route exact path="/event/:id" component={EventContainer} />
    <Route exact path="/artist/:id" component={ArtistContainer} />
  </Switch>
);

export default Router;
