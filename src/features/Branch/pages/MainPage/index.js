import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import BranchAddForm from 'features/Branch/components/BranchAddForm';
import BranchTable from 'features/Branch/components/BranchTable';
import { branchValues } from 'features/Branch/initialAndValidateValues';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBranches,
  setBranchFormVisible,
  setSelectedBranch,
} from '../../branchSlice';
MainPage.propTypes = {};

function MainPage() {
  const { isBranchFormVisible } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBranches());
  }, []);

  const handleAddClick = () => {
    dispatch(setBranchFormVisible(true));
    dispatch(setSelectedBranch(branchValues.initial));
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
          <BranchTable />
        </div>
      </Space>

      {isBranchFormVisible && <BranchAddForm />}
    </div>
  );
}

export default MainPage;
