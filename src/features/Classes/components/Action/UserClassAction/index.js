import {
  DeleteTwoTone,
  InfoCircleTwoTone,
  MoreOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function UserClassAction(props) {
  const { userClass, onUpdate, onDelete } = props;

  const handleOnDetailClick = () => {
    if (onUpdate) {
      onUpdate(userClass?.userId, userClass?.classes?.id);
    }
  };

  // const handleOnUpdateClick = () => {};

  const handleOnDeleteClick = async () => {
    console.log({ userClass });
    if (onDelete) {
      onDelete(userClass?.userId, userClass?.status, userClass?.classes?.id);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleOnDetailClick}>
        <div className="menu-adjust--center">
          <InfoCircleTwoTone />
          <span className="menu-title">Xem chi tiết</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
      {/* <Menu.Item onClick={handleOnUpdateClick}>
        <div className="menu-adjust--center">
          <EditTwoTone twoToneColor="#ad8b00" />
          <span className="menu-title">Sửa</span>
        </div>
      </Menu.Item> */}

      <Menu.Divider />
      <Menu.Item onClick={handleOnDeleteClick}>
        <div className="menu-adjust--center">
          <DeleteTwoTone twoToneColor="#a8071a" />
          <span className="menu-title">Xóa</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button type="primary" ghost icon={<MoreOutlined />} shape="circle" />
    </Dropdown>
  );
}

UserClassAction.propTypes = {
  userClass: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

UserClassAction.defaultProps = {
  userClass: null,
  onUpdate: null,
  onDelete: null,
};

export default UserClassAction;
