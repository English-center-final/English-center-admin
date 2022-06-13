import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Pagination, Row, Space } from 'antd';
import { fetchUserClasses } from 'features/Classes/classesSlice';
import { userClassValues } from 'features/Classes/initialAndValidateValues';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import commonFuc from 'utils/commonFuc';
import AddUserClassModal from '../../Modal/AddUserClassModal';
import UserClassSearch from '../../SearchBar/UserClassSearch';
import UserClassTable from '../../Table/UserClassTable';

function UserClassPane() {
  const { userClassPage } = useSelector((state) => state.classes);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, page, totalPages } = userClassPage;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValue, setInitialValue] = useState(userClassValues.initial);

  const [query, setQuery] = useState({
    name: '',
    status: '',
    classId: id,
    page: 0,
    size: 10,
  });

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  const handleSearchChange = (queryValue) => {
    const { name, status } = queryValue;

    setQuery({ name, status, classId: id, page: 0, size: 10 });
  };

  useEffect(() => {
    dispatch(fetchUserClasses(query));
  }, [query]);

  const handleOnClick = () => {
    setIsModalVisible(true);
    setInitialValue({ ...userClassValues.initial, classesId: +id });
  };

  return (
    <div className="schedule-pane">
      <Row justify="space-between" gutter={[8, 8]}>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Button
            type="primary"
            onClick={handleOnClick}
            icon={<PlusCircleOutlined />}
          >
            Thêm
          </Button>
        </Col>
        <UserClassSearch onChange={handleSearchChange} />
      </Row>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="blog-main-page__table">
          <UserClassTable
            userClasses={commonFuc.addSTTForList(data, query.page * query.size)}
            setInitialValue={setInitialValue}
            setIsModalVisible={setIsModalVisible}
            query={query}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <Pagination
            current={page + 1 || 1}
            total={totalPages * 10 || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      </Space>
      {isModalVisible && (
        <AddUserClassModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          initialValue={initialValue}
          query={query}
        />
      )}
    </div>
  );
}

UserClassPane.propTypes = {
  classes: PropTypes.object,
};

UserClassPane.defaultProps = {
  classes: null,
};

export default UserClassPane;
