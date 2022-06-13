import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import PropTypes from 'prop-types';
import React from 'react';
import ScheduleAction from '../../Action/ScheduleAction';

function ScheduleTable(props) {
  const { setInitialValue, setIsModalVisible, setIsAddMode, schedules, query } =
    props;

  return (
    <Table
      dataSource={schedules}
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
      <Column title="Ngày học" width="108px" dataIndex="date" key="date" />
      <Column title="Phòng" dataIndex="room" key="room" />
      <Column title="Ca" dataIndex="session" key="session" />
      <Column title="Mô tả" dataIndex="description" key="description" />

      {/* <Column
        title="Trạng thái"
        dataIndex="status"
        key="status"
        // render={(_, record) => {
        //   const status = getClassStatusObj(record.status);
        //   return <Tag color={status.color}>{status.value}</Tag>;
        // }}
      /> */}
      <Column
        key="action"
        align="center"
        render={(_, record) => {
          return (
            <ScheduleAction
              scheduleId={record.id}
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

ScheduleTable.propTypes = {
  schedules: PropTypes.array,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ScheduleTable.defaultProps = {
  schedules: [],
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ScheduleTable;
