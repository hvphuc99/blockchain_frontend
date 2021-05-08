import 'App.less';
import store from 'app/store';
import Layout from 'components/Layout';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Login from 'features/Auth/pages/Login';
import Wallet from 'features/Wallet';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'styles/common.scss';
import Register from './features/Auth/pages/Register';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />

          <Layout>
            <Switch>
              <PrivateRoute path="/" component={Wallet} />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
