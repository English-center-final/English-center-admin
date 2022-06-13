import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Pagination, Row, Space } from 'antd';
import { fetchSchedule } from 'features/Classes/classesSlice';
import {
  scheduleValues,
  wordValues,
} from 'features/Classes/initialAndValidateValues';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import commonFuc from 'utils/commonFuc';
import ScheduleModal from '../../Modal/ScheduleModal';
import ScheduleSearch from '../../SearchBar/ScheduleSearch';
import ScheduleTable from '../../Table/ScheduleTable';

function SchedulePane() {
  const { schedulePage } = useSelector((state) => state.classes);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, page, totalPages } = schedulePage;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [initialValue, setInitialValue] = useState(wordValues.initial);

  const [query, setQuery] = useState({
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  });

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  const handleSearchChange = (queryValue) => {
    const { dateFrom, dateTo } = queryValue;

    setQuery({ dateFrom, dateTo, page: 0, size: 10 });
  };

  useEffect(() => {
    dispatch(fetchSchedule({ classId: id, query }));
  }, [query]);

  const handleOnClick = () => {
    setIsModalVisible(true);
    setIsAddMode(true);
    setInitialValue({ ...scheduleValues.initial, classId: id });
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
        <ScheduleSearch onChange={handleSearchChange} />
      </Row>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="blog-main-page__table">
          <ScheduleTable
            schedules={commonFuc.addSTTForList(data, query.page * query.size)}
            setInitialValue={setInitialValue}
            setIsModalVisible={setIsModalVisible}
            setIsAddMode={setIsAddMode}
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
        <ScheduleModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          isAddMode={isAddMode}
          initialValue={initialValue}
          query={query}
        />
      )}
    </div>
  );
}

SchedulePane.propTypes = {
  classes: PropTypes.object,
};

SchedulePane.defaultProps = {
  classes: null,
};

export default SchedulePane;
