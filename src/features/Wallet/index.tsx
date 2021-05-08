import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SendTransaction from './pages/SendTransaction';
import TransactionHistory from './pages/TransactionHistory';

function Wallet(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/sendTransaction" component={SendTransaction} />
      <Route exact path="/transactionHistory" component={TransactionHistory} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Wallet;
