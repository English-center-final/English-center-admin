import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import LevelAddForm from 'features/Level/components/LevelAddForm';
import LevelTable from 'features/Level/components/LevelTable';
import { levelValues } from 'features/Level/initialAndValidateValues';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLevels,
  setLevelFormVisible,
  setSelectedLevel,
} from '../../levelSlice';
MainPage.propTypes = {};

function MainPage() {
  const { isLevelFormVisible } = useSelector((state) => state.level);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLevels());
  }, []);

  const handleAddClick = () => {
    dispatch(setLevelFormVisible(true));
    dispatch(setSelectedLevel(levelValues.initial));
  };

  return (
    <div id="level-main-page">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="level-button--add">
          <Button
            type="primary"
            onClick={handleAddClick}
            icon={<PlusCircleOutlined />}
            size="mediunm"
          >
            Thêm
          </Button>
        </div>

        <div className="level-table">
          <LevelTable />
        </div>
      </Space>

      {isLevelFormVisible && <LevelAddForm />}
    </div>
  );
}

export default MainPage;
