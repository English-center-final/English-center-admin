import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  InfoCircleTwoTone,
  MoreOutlined,
} from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Dropdown, Menu, message, Modal } from 'antd';
import { classApi } from 'api';
import { fetchClasses } from 'features/Classes/classesSlice';
import { deleteCourse, fetchCourses } from 'features/Course/courseSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import commonFuc from 'utils/commonFuc';

const { confirm } = Modal;

function ClassAction(props) {
  const { classId, setInitialValue, setIsModalVisible, setIsAddMode, query } =
    props;

  const { classesPage } = useSelector((state) => state.classes);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnDetailClick = () => {
    history.push(`/admin/classes/${classId}`);
  };

  const handleOnUpdateClick = () => {
    const classes = classesPage.data || [];

    const classSearch = classes.find((ele) => ele.id === classId);

    setInitialValue({
      ...classSearch,
      date: classSearch?.date?.split(', '),
    });
    setIsAddMode(false);
    setIsModalVisible(true);
  };

  const handleOnDeleteClick = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn xóa lớp học này không ?',
      async onOk() {
        try {
          await classApi.deleteClass(classId);
          message.success('Xóa thành công');
          dispatch(fetchClasses(query));
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
      <Menu.Item onClick={handleOnDetailClick}>
        <div className="menu-adjust--center">
          <InfoCircleTwoTone />
          <span className="menu-title">Xem chi tiết</span>
        </div>
      </Menu.Item>
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

ClassAction.propTypes = {
  classId: PropTypes.number,
  course: PropTypes.object,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ClassAction.defaultProps = {
  classId: undefined,
  course: {},
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ClassAction;
