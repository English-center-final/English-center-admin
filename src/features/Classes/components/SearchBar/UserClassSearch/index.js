import { Col, Input, Row, Select, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import constants from 'utils/constants';

const { Text } = Typography;
const { Option } = Select;

UserClassSearch.propTypes = {
  onChange: PropTypes.func,
};

UserClassSearch.defaultProps = {
  onChange: null,
};

function UserClassSearch({ onChange }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const typingTimeOutRef = useRef(null);

  const handleTopicChange = (status) => {
    setStatus(status);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setName(value);
    }, 500);
  };

  useEffect(() => {
    onChange({ name, status });
  }, [name, status]);

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={10} xl={10}>
        <Row align="middle" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Text strong>Tên học viên: </Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Input
              name="name"
              style={{ width: '80%' }}
              onChange={handleNameChange}
            />
          </Col>
        </Row>
      </Col>

      <Col xs={24} sm={24} md={24} lg={10} xl={10}>
        <Row align="middle" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Text strong>Trạng thái: </Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Select
              defaultValue=""
              style={{ width: '80%' }}
              onChange={handleTopicChange}
            >
              <Option value="" key={-1}>
                -- Tất cả --
              </Option>
              {Object.values(constants.UserClassStatus).map((ele, index) => {
                return (
                  <Option value={ele.key} key={index}>
                    {ele.value}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default UserClassSearch;
