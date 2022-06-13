import { Pagination, Row, Space, Spin } from 'antd';
import { fetchUserClasses } from 'features/Classes/classesSlice';
import RegisterSearch from 'features/Classes/components/SearchBar/RegisterSearch';
import RegisterTable from 'features/Classes/components/Table/RegisterTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import commonFuc from 'utils/commonFuc';
import './style.scss';

function UserClassPage() {
  const { userClassPage, isLoading } = useSelector((state) => state.classes);
  const { levels } = useSelector((state) => state.level);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data, page, totalPages } = userClassPage;

  const [query, setQuery] = useState({
    name: '',
    status: '',
    classId: null,
    levelSlug: '',
    page: 0,
    size: 10,
  });

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page - 1 });
  };

  const handleSearchChange = (queryValue) => {
    const { name, status, levelSlug } = queryValue;

    setQuery({ name, status, classId: null, levelSlug, page: 0, size: 10 });
  };

  useEffect(() => {
    dispatch(fetchUserClasses(query));
  }, [query]);

  return (
    <Spin spinning={isLoading}>
      <div className="classes-detail-page">
        <Row justify="space-between" gutter={[8, 8]}>
          <RegisterSearch levels={levels} onChange={handleSearchChange} />
        </Row>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="blog-main-page__table">
            <RegisterTable
              userClasses={commonFuc.addSTTForList(
                data,
                query.page * query.size
              )}
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
      </div>
    </Spin>
  );
}

export default UserClassPage;
