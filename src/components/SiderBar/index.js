import {
  ApartmentOutlined,
  AppstoreOutlined,
  BookOutlined,
  CarryOutOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ReadOutlined,
  RollbackOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Col, Layout, Menu, message, Popover, Row } from 'antd';
import { setDefaultLogin } from 'app/globalSlice';
import settings from 'app/settings';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';

SiderBar.propTypes = {};

const { Sider } = Layout;
const { SubMenu } = Menu;

const renderCourseMenu = () => {
  return (
    <SubMenu key="course" icon={<BookOutlined />} title="Quản lý từ vựng">
      <Menu.Item
        key={settings.routes.courses.url}
        icon={<UnorderedListOutlined />}
      >
        <Link to={settings.routes.courses.url}>Bộ từ vựng</Link>
      </Menu.Item>

      <Menu.Item
        key={settings.routes.topics.url}
        icon={<UnorderedListOutlined />}
      >
        <Link to={settings.routes.topics.url}>Chủ đề</Link>
      </Menu.Item>
    </SubMenu>
  );
};

const renderClassesMenu = () => {
  return (
    <SubMenu key="classes" icon={<AppstoreOutlined />} title="Quản lý lớp học">
      <Menu.Item key={settings.routes.classes.url} icon={<ReadOutlined />}>
        <Link to={settings.routes.classes.url}>Lớp</Link>
      </Menu.Item>

      {/* <Menu.Item
        key={settings.routes.registered.url}
        icon={<UnorderedListOutlined />}
      >
        <Link to={settings.routes.registered.url}>Đăng ký</Link>
      </Menu.Item> */}

      <Menu.Item key={settings.routes.levels.url} icon={<CarryOutOutlined />}>
        <Link to={settings.routes.levels.url}>Khoá học</Link>
      </Menu.Item>
    </SubMenu>
  );
};

function SiderBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { name, roles, avatar } = useSelector((state) => state.global);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const renderMenu = () => {
    const menus = [
      <Menu.Item key={settings.routes.home.url} icon={<DashboardOutlined />}>
        <Link to={settings.routes.home.url}>Trang chủ</Link>
      </Menu.Item>,
    ];

    roles.forEach((roleEle) => {
      if (roleEle === constants.Role.COURSE) {
        menus.push(renderCourseMenu());
      }
      if (roleEle === constants.Role.EXAM) {
        menus.push(
          <Menu.Item
            key={settings.routes.exams.url}
            icon={<CarryOutOutlined />}
          >
            <Link to={settings.routes.exams.url}>Quản lý đề thi</Link>
          </Menu.Item>
        );
      }
      // if (roleEle === constants.Role.CLASS) {
      //   menus.push(renderClassesMenu());
      // }
    });

    return menus;
  };

  const checkAdminRole = () => {
    const index = roles.findIndex(
      (roleEle) => roleEle === constants.Role.ADMIN
    );

    return index !== -1;
  };
  const handleLogout = () => {
    localStorage.removeItem('kltn-token');
    dispatch(setDefaultLogin());

    message.success('Đăng xuất thành công');
  };
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        defaultSelectedKeys={[
          commonFuc.getKeyOfCurrentRoute(location.pathname),
        ]}
        mode="inline"
      >
        {checkAdminRole() ? (
          <>
            <Popover
              content={
                <>
                  <Menu.Item key="2" icon={<RollbackOutlined />}>
                    <a href="http://localhost:3000"> Về trang chủ</a>
                  </Menu.Item>
                  <br />
                  <Menu.Item key="3" icon={<LogoutOutlined />}>
                    <Link onClick={handleLogout}> Đăng xuất</Link>
                  </Menu.Item>
                </>
              }
            >
              <div style={{ height: 'auto' }}>
                <Row>
                  <Col span={6} offset={2}>
                    {avatar ? (
                      <>
                        <Avatar
                          style={{ marginTop: '10px' }}
                          size={32}
                          src={avatar}
                        />
                      </>
                    ) : (
                      <>
                        <Avatar
                          style={{ marginTop: '10px' }}
                          size={32}
                          icon={<UserOutlined />}
                        />
                      </>
                    )}
                  </Col>
                  <Col span={16}>
                    <div
                      style={{
                        color: 'white',
                        fontSize: '15px',
                        marginTop: '25px',
                      }}
                    >
                      {name}
                    </div>
                  </Col>
                </Row>
              </div>
            </Popover>
            {/* <SubMenu
              key="sub2"
              icon={
                
                <Avatar
                  style={{ marginTop: '10px' }}
                  size={32}
                  icon={<UserOutlined />}
                />
              }
              title={
                <div
                  style={{
                    color: 'white',
                    fontSize: '15px',
                    marginTop: '15px',
                  }}
                >
                  {name}
                </div>
              }
            >
              <Menu.Item key="2" icon={<RollbackOutlined />}>
                <Link to="/"> Về trang chủ</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<LogoutOutlined />} >
                <Link onClick={handleLogout}> Đăng xuất</Link>
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item
              key={settings.routes.home.url}
              icon={<DashboardOutlined />}
            >
              <Link to={settings.routes.home.url}>Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key={settings.routes.users.url} icon={<UserOutlined />}>
              <Link to={settings.routes.users.url}>Quản lý người dùng</Link>
            </Menu.Item>
            {/*  */}
            {renderCourseMenu()}
            <Menu.Item key={settings.routes.books.url} icon={<BookOutlined />}>
              <Link to={settings.routes.books.url}>Quản lý bộ đề</Link>
            </Menu.Item>
            <Menu.Item
              key={settings.routes.exams.url}
              icon={<CarryOutOutlined />}
            >
              <Link to={settings.routes.exams.url}>Quản lý đề thi</Link>
            </Menu.Item>

            {/* <Menu.Item
              key={settings.routes.classes.url}
              icon={<CarryOutOutlined />}
            >
              <Link to={settings.routes.classes.url}>Quản lý lớp học</Link>
            </Menu.Item> */}
            {renderClassesMenu()}

            <Menu.Item
              key={settings.routes.branches.url}
              icon={<ApartmentOutlined />}
            >
              <Link to={settings.routes.branches.url}>Cơ sở</Link>
            </Menu.Item>
          </>
        ) : (
          renderMenu()
        )}
      </Menu>
    </Sider>
  );
}

export default SiderBar;
