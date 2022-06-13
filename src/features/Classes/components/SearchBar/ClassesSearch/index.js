import { Col, DatePicker, Row, Select, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import commonFuc from 'utils/commonFuc';

const { Text } = Typography;
const { Option, OptGroup } = Select;

ClassesSearch.propTypes = {
  levels: PropTypes.array.isRequired,
  branches: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

ClassesSearch.defaultProps = {
  levels: [],
  branches: [],
  onChange: null,
};

function ClassesSearch({ levels, branches, onChange }) {
  const [levelSlug, setLevelSlug] = useState('');
  const [branchId, setBranchId] = useState(null);
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleLevelChange = (slug) => {
    setLevelSlug(slug);
  };
  const handleBranchChange = (branchId) => {
    setBranchId(branchId);
  };

  const handleDateFromChange = (_, dateString) => {
    setDateFrom(dateString);
  };

  const handleDateToChange = (_, dateString) => {
    const date = commonFuc.formatDate(dateString);
    setDateTo(dateString);
  };

  useEffect(() => {
    onChange({ levelSlug, branchId, status, dateFrom, dateTo });
  }, [levelSlug, branchId, status, dateFrom, dateTo]);

  return (
    <>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row align="middle" gutter={[8, 8]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Text strong>Từ ngày: </Text>
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
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
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
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

      <Col offset={2} xs={24} sm={24} md={24} lg={6} xl={6}>
        <Row align="middle" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Text strong>Khoá học: </Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Select
              defaultValue=""
              style={{ width: '80%' }}
              onChange={handleLevelChange}
            >
              <Option value={''} key={-1}>
                -- Tất cả --
              </Option>
              {levels.map((level, index) => {
                const { name, slug } = level;
                return (
                  <Option value={slug} key={index}>
                    {name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
      </Col>

      <Col offset={2} xs={24} sm={24} md={24} lg={6} xl={6}>
        <Row align="middle" gutter={[8, 8]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Text strong>Cơ sở: </Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Select
              defaultValue={null}
              style={{ width: '80%' }}
              onChange={handleBranchChange}
            >
              <Option value={null} key={-1}>
                -- Tất cả --
              </Option>
              {branches.map((ele, index) => (
                <OptGroup label={ele.group} key={index + 1}>
                  {ele.options.map((option) => (
                    <Option key={option.key} value={option.key}>
                      {option.value}
                    </Option>
                  ))}
                  )
                </OptGroup>
              ))}
            </Select>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ClassesSearch;
