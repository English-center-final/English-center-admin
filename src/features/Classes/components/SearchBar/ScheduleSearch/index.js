import { Col, DatePicker, Row, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

ScheduleSearch.propTypes = {
  onChange: PropTypes.func,
};

ScheduleSearch.defaultProps = {
  onChange: null,
};

function ScheduleSearch({ onChange }) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleDateFromChange = (_, dateString) => {
    setDateFrom(dateString);
  };

  const handleDateToChange = (_, dateString) => {
    setDateTo(dateString);
  };

  useEffect(() => {
    onChange({ dateFrom, dateTo });
  }, [dateFrom, dateTo]);

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={10} xl={10}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align="middle" gutter={[8, 8]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Text strong>Từ ngày: </Text>
              </Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  onChange={handleDateFromChange}
                />
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align="middle" gutter={[8, 8]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Text strong>đến ngày: </Text>
              </Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  onChange={handleDateToChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ScheduleSearch;
