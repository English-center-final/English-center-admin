import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import PropTypes from 'prop-types';
import React from 'react';
import ExamAction from '../ExamAction';

function ExamTable(props) {
  const { setInitialValue, setIsModalVisible, setIsAddMode, exams, query } =
    props;

  return (
    <Table dataSource={exams} pagination={false} rowKey={(record) => record.id}>
      <Column
        align="center"
        width="60px"
        title="STT"
        dataIndex="stt"
        key="stt"
      />
      <Column title="Tên đề thi" dataIndex="name" key="name" />
      <Column title="Bộ đề" dataIndex="bookName" key="bookName" />
      <Column
        key="action"
        align="center"
        render={(_, record) => {
          return (
            <ExamAction
              exam={record}
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

ExamTable.propTypes = {
  exams: PropTypes.array,
  setInitialValue: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  setIsAddMode: PropTypes.func,
  query: PropTypes.object,
};

ExamTable.defaultProps = {
  exams: [],
  setInitialValue: null,
  setIsModalVisible: null,
  setIsAddMode: null,
};

export default ExamTable;
