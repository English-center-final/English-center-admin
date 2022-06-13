import { Layout, message } from 'antd';
import { setDefaultLogin } from 'app/globalSlice';
import AuthorizeRoute from 'components/AuthorizeRoute';
import NotFoundPage from 'components/NotFoundPage';
import SiderBar from 'components/SiderBar';
import Book from 'features/Book';
import Branch from 'features/Branch';
import Classes from 'features/Classes';
import UserClassPage from 'features/Classes/pages/UserClassPage';
import Course from 'features/Course';
import Exam from 'features/Exam';
import Level from 'features/Level';
import User from 'features/User';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import './style.scss';

const { Header, Content, Footer } = Layout;

AdminLayout.propTypes = {};

function AdminLayout() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const { isLogin } = useSelector((state) => state.global);

  const handleLogout = () => {
    localStorage.removeItem('kltn-token');
    dispatch(setDefaultLogin());

    message.success('Đăng xuất thành công');
  };

  return (
    <div id="admin-layout">
      {!isLogin ? (
        <Redirect to="/login" />
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <SiderBar />
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }}>
              <Button onClick={handleLogout}>Logout</Button>
            </Header> */}
            <Content
              style={{
                margin: '1rem 1rem 0',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb> */}

              <div className="site-layout-background" style={{ flex: 1 }}>
                <Switch>
                  {/* <Route exact path={url} component={Home} /> */}
                  <Route exact path={url} component={UserClassPage} />

                  <AuthorizeRoute
                    path={`${url}/exams`}
                    component={Exam}
                    role="ROLE_EXAM"
                  />

                  <AuthorizeRoute
                    path={`${url}/courses`}
                    component={Course}
                    role="ROLE_COURSE"
                  />

                  <AuthorizeRoute
                    path={`${url}/books`}
                    component={Book}
                    role="ROLE_BOOK"
                  />

                  <AuthorizeRoute path={`${url}/users`} component={User} />
                  <AuthorizeRoute path={`${url}/levels`} component={Level} />

                  <AuthorizeRoute path={`${url}/classes`} component={Classes} />
                  <AuthorizeRoute
                    path={`${url}/registered-students`}
                    component={UserClassPage}
                  />

                  <Route exact path={`${url}/branches`} component={Branch} />

                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              IUH - Đại học Công Nghiệp TP.Hồ Chí Minh
            </Footer>
          </Layout>
        </Layout>
      )}
    </div>
  );
}

export default AdminLayout;
