import React from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function Wallet(): JSX.Element {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={Dashboard} />
      <Redirect from="/" to={match.url} />
    </Switch>
  );
}

export default Wallet;
