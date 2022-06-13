import { Col, DatePicker, Input, Row, Typography } from 'antd';
import TagCustom from 'components/TagCustom';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

DatePickerField.propTypes = {
  title: PropTypes.string,
  isRequire: PropTypes.bool,
  disabled: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
  size: PropTypes.string,
  format: PropTypes.string,
  field: PropTypes.object,
};

DatePickerField.defaultProps = {
  title: '',
  maxLength: 50,
  isRequire: false,
  disabled: false,
  titleCol: 24,
  inputCol: 24,
  size: 'middle',
  format: 'YYYY-MM-DD',
};

function DatePickerField(props) {
  const {
    field,
    title,
    disabled,
    isRequire = false,
    titleCol = 8,
    inputCol = 16,
    size,
    format,
  } = props;
  const { name, value } = field;

  const handleChange = (_date, dateString) => {
    const changeEvent = {
      target: {
        name,
        value: dateString,
      },
    };

    field.onChange(changeEvent);
  };

  return (
    <Row>
      <Col span={titleCol}>
        <Text strong>
          {title}

          {isRequire && <Text type="danger"> *</Text>}
        </Text>
      </Col>
      <Col span={inputCol}>
        <DatePicker
          disabled={disabled}
          size={size}
          format={format}
          onChange={handleChange}
          defaultValue={moment(value, format)}
        />
        <ErrorMessage name={name}>
          {(text) => <TagCustom title={text} color="error" />}
        </ErrorMessage>
      </Col>
    </Row>
  );
}

export default DatePickerField;
