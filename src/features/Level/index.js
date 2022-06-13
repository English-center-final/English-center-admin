import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import MainPage from './pages/MainPage';

Level.propTypes = {};

function Level() {
  const { isLoading } = useSelector((state) => state.level);
  const { url } = useRouteMatch();
  return (
    <Spin spinning={isLoading}>
      <Switch>
        <Route exact path={url} component={MainPage} />
      </Switch>
    </Spin>
  );
}

export default Level;
