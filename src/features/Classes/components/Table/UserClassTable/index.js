import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import { classApi } from 'api';
import settings from 'app/settings';
import { fetchUserClasses } from 'features/Classes/classesSlice';
import { userClassValues } from 'features/Classes/initialAndValidateValues';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import UserClassAction from '../../Action/UserClassAction';
import UpdateUserClassModal from '../../Modal/UpdateUserClassModal';

function UserClassTable(props) {
  const { userClasses, query } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValue, setInitialValue] = useState(userClassValues.initial);
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const handleOnUpdateClick = (userId, classesId) => {
    const userClassesSearch = userClasses.find(
      (ele) => ele.userId === userId && ele.classes.id === classesId
    );

    setInitialValue({
      userId,
      status: userClassesSearch.status,
      classesId: userClassesSearch.classes.id,
      name: userClassesSearch.name,
      email: userClassesSearch.email,
      phoneNumber: userClassesSearch.phoneNumber,
    });
    setIsModalVisible(true);
  };

  const handleOnDeleteClick = async (userId, status, classesId) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có muốn xóa học viên ra khỏi lớp học này không ?',
      async onOk() {
        try {
          await classApi.deleteUserClass({ classesId, status, userId });
          message.success('Xoá thành công');
          dispatch(fetchUserClasses(query));
        } catch (error) {
          message.error('Có lỗi xảy ra');
        }
      },
      onCancel() {},
    });
  };

  return (
    <>
      <Table
        dataSource={userClasses}
        pagination={false}
        rowKey={(record) => record.stt}
      >
        <Column
          align="center"
          width="60px"
          title="STT"
          dataIndex="stt"
          key="stt"
        />
        <Column title="Tên" dataIndex="name" key="name" />
        <Column
          title="Số điện thoại"
          dataIndex="phoneNumber"
          key="phoneNumber"
        />
        <Column title="Email" dataIndex="email" key="email" />

        <Column
          title="Trạng thái"
          dataIndex="status"
          key="status"
          render={(_, record) => {
            const status = commonFuc.getStatusObj(
              record.status,
              settings.constants.UserClassStatus
            );
            return <Tag color={status.color}>{status.value}</Tag>;
          }}
        />
        <Column
          key="action"
          align="center"
          render={(_, record) => {
            return (
              <UserClassAction
                userClass={record}
                onUpdate={handleOnUpdateClick}
                onDelete={handleOnDeleteClick}
              />
            );
          }}
        />
        {/* <Column
          key="action"
          align="center"
          render={(_, record) => {
            return (
              <Button
                type="primary"
                ghost
                icon={<MoreOutlined />}
                shape="circle"
                onClick={() =>
                  handleOnUpdateClick(record.userId, record.classes.id)
                }
              />
            );
          }}
        /> */}
      </Table>

      <UpdateUserClassModal
        initialValue={initialValue}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        query={query}
      />
    </>
  );
}

UserClassTable.propTypes = {
  userClasses: PropTypes.array,

  query: PropTypes.object,
};

UserClassTable.defaultProps = {
  userClasses: [],
  setIsAddMode: null,
};

export default UserClassTable;
