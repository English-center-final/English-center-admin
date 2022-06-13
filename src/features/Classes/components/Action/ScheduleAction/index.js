import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { scheduleApi } from 'api';
import { fetchClasses, fetchSchedule } from 'features/Classes/classesSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { confirm } = Modal;

function ScheduleAction(props) {
  const {
    scheduleId,
    setInitialValue,
    setIsModalVisible,
    setIsAddMode,
    query,
  } = props;

  const { schedulePage } = useSelector((state) => state.classes);

  const dispatch = useDispatch();

  const handleOnUpdateClick = () => {
    const schedule = schedulePage.data || [];

    const scheduleSearch = schedule.find((ele) => ele.id === scheduleId);

    setInitialValue({
      ...scheduleSearch,
    });
    setIsAddMode(false);
    setIsModalVisible(true);
  };

  const handleOnDeleteClick = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn xóa lịch học này không ?',
      async onOk() {
        try {
          const schedule = schedulePage.data || [];
          const scheduleSearch = schedule.find((ele) => ele.id === scheduleId);

          await scheduleApi.deleteSchedule(scheduleId);
          message.success('Xóa thành công');

          dispatch(fetchSchedule({ classId: scheduleSearch.classId, query }));
        } catch (error) {
          message.error('Xóa thất bại');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Divider />
      <Menu.Item onClick={handleOnUpdateClick}>
        <div className="menu-adjust--center">
          <EditTwoTone twoToneColor="#ad8b00" />
          <span className="menu-title">Sửa</span>
        </div>
      </Menu.Item>

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

ScheduleAction.propTypes = {
  scheduleId: PropTypes.number,
  course: PropTypes.object,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ScheduleAction.defaultProps = {
  scheduleId: undefined,
  course: {},
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ScheduleAction;
