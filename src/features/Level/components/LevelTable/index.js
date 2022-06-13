import { Image, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';
import LevelAction from '../LevelAction';
LevelTable.propTypes = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên khoá học ',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Hình ảnh ',
    dataIndex: 'image',
    key: 'image',
    render: (text) => (
      <Image
        width={120}
        src={text ? text : constants.ERROR_IMAGE}
        height={80}
        fallback={constants.ERROR_IMAGE}
        style={{ objectFit: 'cover', backgroundPosition: 'center center' }}
      />
    ),
    // <img className="book_img" src={text} alt='hình ảnh' />
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text, record) => <LevelAction levelId={record.id} />,
  },
];

function LevelTable(props) {
  const { levels } = useSelector((state) => state.level);
  return (
    <Table
      columns={columns}
      dataSource={commonFuc.addSTTForList(levels, 0)}
      pagination={false}
      scroll={{ y: 420 }}
      style={{ height: '490px' }}
      rowKey={(record) => record.id}
    />
  );
}

export default LevelTable;
