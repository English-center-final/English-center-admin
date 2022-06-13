import { DeleteTwoTone, EditTwoTone, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { branchApi } from 'api';
import {
  deleteBranch,
  setBranchFormVisible,
  setSelectedBranch,
} from 'features/Branch/branchSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

BranchAction.propTypes = {
  branchId: PropTypes.number.isRequired,
};

function BranchAction(props) {
  const { branchId } = props;
  const { branches } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const branch = branches.find((c) => c.id === branchId);
    dispatch(setSelectedBranch(branch));
    dispatch(setBranchFormVisible(true));
  };

  const handleDelete = () => {
    confirm({
      content: 'Bạn có chắc chắn xóa không ?',
      async onOk() {
        try {
          await branchApi.deleteBranch(branchId);
          dispatch(deleteBranch(branchId));

          message.success('Xóa thành công');
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleUpdate}>
        <div className="menu-adjust--center">
          <EditTwoTone twoToneColor="#ad8b00" />
          <span className="menu-title">Sửa thông tin</span>
        </div>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item onClick={handleDelete}>
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

export default BranchAction;
