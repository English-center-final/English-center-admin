import { Tabs } from 'antd';
import { fetchClassById } from 'features/Classes/classesSlice';
import ClassesDetailPane from 'features/Classes/components/TabPane/ClassesDetailPane';
import SchedulePane from 'features/Classes/components/TabPane/SchedulePane';
import UserClassPane from 'features/Classes/components/TabPane/UserClassPane';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import './style.scss';

function ClassesDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(fetchClassById(id));
    // dispatch(fetchWordsByCourse(query));
  }, []);

  return (
    <div className="classes-detail-page">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Chi tiết" key="1">
          <ClassesDetailPane />
        </TabPane>
        <TabPane tab="Lịch học" key="2">
          <SchedulePane />
        </TabPane>
        <TabPane tab="Danh sách học viên" key="3">
          <UserClassPane />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ClassesDetailPage;
