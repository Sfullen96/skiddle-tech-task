import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';

const Router = () => (
  <Switch>
    <Route exact path="/home" component={App} />
  </Switch>
);

export default Router;
