import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

AuthorizeRoute.propTypes = {};

// eslint-disable-next-line react/prop-types
function AuthorizeRoute({ component: Component, role, path }) {
  const { roles } = useSelector((state) => state.global);

  const handleAuthorizeCheck = () => {
    const index = roles.findIndex(
      (roleEle) => roleEle === 'ROLE_ADMIN' || roleEle === role
    );

    return index !== -1;
  };

  return (
    <Route
      path={path}
      render={(props) => {
        if (handleAuthorizeCheck()) {
          return <Component {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: '/admin',
              state: {
                // eslint-disable-next-line react/prop-types
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}

export default AuthorizeRoute;
