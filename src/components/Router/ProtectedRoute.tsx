import  React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppConsts from  '../../lib/appconst';

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {

  console.log('path:'+path+"  permission:"+permission);
  return (
    <Route
      {...rest}
      render={props => {
        
        if (!AppConsts.session.userId)
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
