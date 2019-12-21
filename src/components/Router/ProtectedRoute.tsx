import  React from 'react';
import { Route, Redirect ,HashRouter} from 'react-router-dom';
import AppConsts from  '../../lib/appconst';
import { getCookie } from '../../utils';

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {

  return (
    <Route
      {...rest}
      render={props => {
        
        if (!AppConsts.getToken())
          return (
            <Redirect
              to={{
                pathname: '/account/login',
                state: { from: props.location },
              }}
            />
          );

        if (permission && !AppConsts.isGranted(permission)) {
          return (
            <Redirect
              to={{
                pathname: '/exception?type=401',
                state: { from: props.location },
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
