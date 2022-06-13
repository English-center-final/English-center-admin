import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import MainPage from './pages/MainPage';

function Home() {
  const { url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={url} component={MainPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default Home;
