import { Space, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';

function ClassesDetailPane() {
  const { classDetail } = useSelector((state) => state.classes);

  const status = commonFuc.getStatusObj(
    classDetail.status,
    constants.ClassStatus
  );

  return (
    <div className="classes-detail-pane">
      {classDetail?.id ? (
        <Space direction="vertical" style={{ width: '100%' }} size="small">
          <Text>
            <strong>Mã lớp học:</strong> {classDetail?.id}{' '}
          </Text>
          <Text>
            <strong>Số lượng:</strong>{' '}
            {`${classDetail?.numOfRegister}/${classDetail?.amount}`}{' '}
          </Text>
          <Text>
            <strong>Ngày bắt đầu:</strong> {classDetail?.dateStart}{' '}
          </Text>
          <Text>
            <strong>Số buổi học:</strong> {classDetail?.numOfLessons}{' '}
          </Text>
          <Text>
            <strong>Ngày học:</strong>{' '}
            {commonFuc.toVietnamDay(classDetail?.date).join(', ')}
          </Text>
          <Text>
            <strong>Trạng thái:</strong>{' '}
            <Tag color={status.color}>{status.value}</Tag>
          </Text>
          <Text>
            <strong>Mô tả:</strong> {classDetail?.description}{' '}
          </Text>
          <Text>
            <strong>Khoá học:</strong> {classDetail?.levelName}{' '}
          </Text>
          <Text>
            <strong>Phòng:</strong> {classDetail?.room}{' '}
          </Text>
          <Text>
            <strong>Cơ sở:</strong> {classDetail?.branchName}{' '}
          </Text>
          <Text>
            <strong>Địa chỉ:</strong> {classDetail?.branchAddress}{' '}
          </Text>
        </Space>
      ) : (
        <Text>Không tìm thấy</Text>
      )}
    </div>
  );
}

ClassesDetailPane.propTypes = {
  classes: PropTypes.object,
};

ClassesDetailPane.defaultProps = {
  classes: null,
};

export default ClassesDetailPane;
