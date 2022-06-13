import { Table, Tag } from 'antd';
import Column from 'antd/lib/table/Column';
import settings from 'app/settings';
import PropTypes from 'prop-types';
import React from 'react';
import commonFuc from 'utils/commonFuc';
import ClassAction from '../../Action/ClassAction';

function ClassesTable(props) {
  const { setInitialValue, setIsModalVisible, setIsAddMode, classes, query } =
    props;

  return (
    <Table
      dataSource={classes}
      pagination={false}
      rowKey={(record) => record.id}
    >
      <Column
        align="center"
        width="60px"
        title="STT"
        dataIndex="stt"
        key="stt"
      />
      <Column title="Mã lớp học" width="108px" dataIndex="id" key="id" />
      <Column title="Khoá học" dataIndex="levelName" key="levelName" />
      <Column title="Ngày bắt đầu" dataIndex="dateStart" key="dateStart" />
      <Column
        title="Ngày học"
        dataIndex="date"
        key="date"
        render={(_, record) => (
          <span>{commonFuc.toVietnamDay(record.date).join(', ')}</span>
        )}
      />
      <Column
        title="Số lượng"
        // dataIndex="amount"
        // key="amount"
        render={(_, record) => (
          <span>{`${record.numOfRegister}/${record.amount}`}</span>
        )}
      />
      <Column
        title="Trạng thái"
        dataIndex="status"
        key="status"
        render={(_, record) => {
          const status = commonFuc.getStatusObj(
            record.status,
            settings.constants.ClassStatus
          );
          return <Tag color={status.color}>{status.value}</Tag>;
        }}
      />
      <Column
        key="action"
        align="center"
        render={(_, record) => {
          return (
            <ClassAction
              classId={record.id}
              setInitialValue={setInitialValue}
              setIsModalVisible={setIsModalVisible}
              setIsAddMode={setIsAddMode}
              query={query}
            />
          );
        }}
      />
    </Table>
  );
}

ClassesTable.propTypes = {
  classes: PropTypes.array,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ClassesTable.defaultProps = {
  classes: [],
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ClassesTable;
