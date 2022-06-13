import { Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import BranchAction from '../BranchAction';
BranchTable.propTypes = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Cơ sở ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Địa chỉ ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text, record) => <BranchAction branchId={record.id} />,
  },
];

function BranchTable(props) {
  const { branches } = useSelector((state) => state.branch);
  return (
    <Table
      columns={columns}
      dataSource={commonFuc.addSTTForList(branches, 0)}
      pagination={false}
      scroll={{ y: 420 }}
      style={{ height: '490px' }}
      rowKey={(record) => record.id}
    />
  );
}

export default BranchTable;
