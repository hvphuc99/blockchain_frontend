import React from 'react';
import 'App.less';
import 'styles/common.scss';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import Login from 'features/Auth/pages/Login';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import { Provider } from 'react-redux';
import store from 'app/store';
import Register from './features/Auth/pages/Register';
import Layout from 'components/Layout';
import Wallet from 'features/Wallet';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />

          <Layout>
            <Switch>
              <PrivateRoute path="/dashboard" component={Wallet} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
