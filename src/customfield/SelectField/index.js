import { Col, Row, Select, Typography } from 'antd';
import TagCustom from 'components/TagCustom';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const { Text } = Typography;

const { Option } = Select;

SelectedField.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  isRequire: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
  field: PropTypes.object,
  firstRow: PropTypes.bool,
  showSearch: PropTypes.bool,
};

SelectedField.defaultProps = {
  title: '',
  options: [],
  isRequire: false,
  titleCol: 24,
  inputCol: 24,
  firstRow: true,
  showSearch: false,
};

function SelectedField({
  field,
  title,
  options,
  isRequire,
  titleCol,
  inputCol,
  firstRow,
  showSearch,
}) {
  const { name, value } = field;

  const handleChange = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value,
      },
    };

    field.onChange(changeEvent);
  };

  return (
    <Row>
      <Col span={titleCol}>
        <Text strong>
          {title} {isRequire && <Text type="danger">*</Text>}
        </Text>
      </Col>
      <Col span={inputCol}>
        <Select
          defaultValue={0}
          value={value}
          onChange={handleChange}
          style={{ width: '100%' }}
          showSearch={showSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {firstRow && <Option value={0}>-- Chọn --</Option>}
          {options.map((s, index) => (
            <Option key={index + 1} value={s.key}>
              {s.value}
            </Option>
          ))}
        </Select>

        <ErrorMessage name={name}>
          {(text) => <TagCustom title={text} color="error" />}
        </ErrorMessage>
      </Col>
    </Row>
  );
}

export default SelectedField;
