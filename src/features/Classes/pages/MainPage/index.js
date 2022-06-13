import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, Pagination, Row, Space } from 'antd';
import { fetchBranches } from 'features/Branch/branchSlice';
import { fetchClasses } from 'features/Classes/classesSlice';
import ClassesModal from 'features/Classes/components/Modal/ClassesModal';
import ClassesSearch from 'features/Classes/components/SearchBar/ClassesSearch';
import ClassesTable from 'features/Classes/components/Table/ClassesTable';
import { classesValues } from 'features/Classes/initialAndValidateValues';
import { courseValues } from 'features/Course/initialAndValidateValues';
import { fetchLevels } from 'features/Level/levelSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import './style.scss';

function MainPage() {
  const dispatch = useDispatch();

  const { levels } = useSelector((state) => state.level);
  const { classesPage } = useSelector((state) => state.classes);
  const { branches } = useSelector((state) => state.branch);
  const { data, page, totalPages } = classesPage;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [initialValue, setInitialValue] = useState(classesValues.initial);

  const [query, setQuery] = useState({
    levelSlug: '',
    branchId: null,
    status: '',
    dateFrom: '',
    dateTo: '',
    page: 0,
    size: 10,
  });

  const handleOnClick = () => {
    setIsModalVisible(true);
    setIsAddMode(true);
    setInitialValue(classesValues.initial);
  };

  const handleSearchChange = (queryValue) => {
    const { levelSlug, branchId, status, dateFrom, dateTo } = queryValue;

    setQuery({
      levelSlug,
      branchId,
      status,
      dateFrom,
      dateTo,
      page: 0,
      size: 10,
    });
  };

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  useEffect(() => {
    dispatch(fetchClasses(query));
    dispatch(fetchLevels());
    dispatch(fetchBranches());
  }, [query]);

  return (
    <div id="course-main-page">
      <div></div>
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
      </Row>
      <br />
      <Row>
        <ClassesSearch
          levels={levels}
          branches={commonFuc.groupBranch(branches)}
          onChange={handleSearchChange}
        />
      </Row>

      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="class-main-page__table">
          <ClassesTable
            classes={commonFuc.addSTTForList(data, query.page * query.size)}
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
          />
        </div>
      </Space>

      {isModalVisible && (
        <ClassesModal
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

export default MainPage;
