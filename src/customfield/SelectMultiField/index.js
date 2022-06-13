import { Col, Row, Select, Typography } from 'antd';
import TagCustom from 'components/TagCustom';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const { Text } = Typography;

const { Option } = Select;

SelectMultiField.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  isRequire: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
  field: PropTypes.object,
};

SelectMultiField.defaultProps = {
  title: '',
  options: [],
  isRequire: false,
  titleCol: 24,
  inputCol: 24,
};

function SelectMultiField({
  field,
  title,
  options,
  isRequire,
  titleCol,
  inputCol,
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
          value={value}
          onChange={handleChange}
          style={{ width: '100%' }}
          mode="multiple"
        >
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

export default SelectMultiField;
