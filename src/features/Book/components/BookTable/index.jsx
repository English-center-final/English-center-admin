import { Image, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';
import BookAction from '../BookAction';
BookTable.propTypes = {};

const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên bộ đề ',
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
    render: (text, record) => <BookAction bookId={record.id} />,
  },
];

function BookTable(props) {
  const { books } = useSelector((state) => state.book);
  const data = [];
  if (books.length > 0) {
    books.forEach((element, index) => {
      let temp = {
        key: element.id,
        name: element.name,
        image: element.image,
        stt: index + 1,
      };
      data.push(temp);
    });
  }
  return (
    <Table
      columns={columns}
      dataSource={commonFuc.addSTTForList(books, 0)}
      pagination={false}
      scroll={{ y: 420 }}
      style={{ height: '490px' }}
      rowKey={(record) => record.id}
    />
  );
}

export default BookTable;
