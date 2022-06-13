import { MoreOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import settings from 'app/settings';
import { userClassValues } from 'features/Classes/initialAndValidateValues';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import commonFuc from 'utils/commonFuc';
import UpdateUserClassModal from '../../Modal/UpdateUserClassModal';

function RegisterTable(props) {
  const { userClasses, query } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValue, setInitialValue] = useState(userClassValues.initial);

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
          title="Mã lớp"
          dataIndex="status"
          key="status"
          render={(_, record) => {
            return <span>{record.classes.id}</span>;
          }}
        />

        <Column
          title="Khoá học"
          dataIndex="status"
          key="status"
          render={(_, record) => {
            return <span>{record.classes.levelName}</span>;
          }}
        />

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
        />
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

RegisterTable.propTypes = {
  userClasses: PropTypes.array,

  query: PropTypes.object,
};

RegisterTable.defaultProps = {
  userClasses: [],
  setIsAddMode: null,
};

export default RegisterTable;
