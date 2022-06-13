import { Spin } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ClassesDetailPage from './pages/ClassesDetailPage';
import MainPage from './pages/MainPage';
import UserClassPage from './pages/UserClassPage';

function Classes() {
  const { url } = useRouteMatch();
  const { isLoading } = useSelector((state) => state.classes);

  return (
    <Spin spinning={isLoading}>
      <Switch>
        <Route exact path={url} component={MainPage} />

        <Route path={`${url}/:id`} component={ClassesDetailPage} />
        {/* <Route
          exact
          path={`${url}/registered-students`}
          component={UserClassPage}
        /> */}
        <Route component={NotFoundPage} />
      </Switch>
    </Spin>
  );
}
Classes.propTypes = {};

export default Classes;
