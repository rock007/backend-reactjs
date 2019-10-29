import  React from 'react';
import { Route, Switch,HashRouter,BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import utils from '../../utils/utils';

const Router = () => {
  const AccountPage = utils.getRoute('/account').component;
  const AppLayout = utils.getRoute('/').component;

  return (
    <HashRouter>
      <Switch>
        <Route path="/account" render={(props: any) => <AccountPage {...props} />} />
        <ProtectedRoute path="/" render={(props: any) => <AppLayout {...props} exact />} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
