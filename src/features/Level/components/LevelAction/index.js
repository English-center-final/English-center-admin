import { DeleteTwoTone, EditTwoTone, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { levelApi } from 'api';
import {
  deleteLevel,
  fetchLevelBySlug,
  setLevelFormVisible,
  setSelectedLevel,
} from 'features/Level/levelSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
LevelAction.propTypes = {
  levelId: PropTypes.number.isRequired,
};

function LevelAction(props) {
  const { levelId } = props;
  const { levels } = useSelector((state) => state.level);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const level = levels.find((c) => c.id === levelId);
    // dispatch(setSelectedLevel(level));
    dispatch(fetchLevelBySlug({ slug: level.slug }));
    dispatch(setLevelFormVisible(true));
  };

  const handleDelete = () => {
    confirm({
      content: 'Bạn có chắc chắn xóa không ?',
      async onOk() {
        try {
          await levelApi.deleteLevel(levelId);
          dispatch(deleteLevel(levelId));

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

export default LevelAction;
