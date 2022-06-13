import { Button, Col, Row, Space, Typography } from 'antd';
import MyEditor from 'components/MyEditor';
import TagCustom from 'components/TagCustom';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

const { Text } = Typography;

EditorField.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  isRequire: PropTypes.bool,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
  field: PropTypes.object,
};

EditorField.defaultProps = {
  title: '',
  placeholder: '',
  isRequire: false,
  titleCol: 24,
  inputCol: 24,
};

function EditorField({
  title,
  placeholder,
  isRequire,
  titleCol,
  inputCol,
  field,
}) {
  const { name, value, onChange } = field;
  let content = value;

  const handleConfirm = () => {
    const changeEvent = {
      target: {
        name: name,
        value: content,
      },
    };

    onChange(changeEvent);
  };

  const handleContentChange = (contentValue) => {
    content = contentValue;

    const changeEvent = {
      target: {
        name: name,
        value: content,
      },
    };

    onChange(changeEvent);
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
        <Space direction="vertical" style={{ width: '100%' }}>
          <MyEditor
            content={value}
            onChange={handleContentChange}
            placeholder={placeholder}
          />
          {/* <div style={{ textAlign: 'center' }}>
            <Button type="primary" ghost onClick={handleConfirm}>
              Lưu
            </Button>
          </div> */}
          <ErrorMessage name={name}>
            {(text) => <TagCustom title={text} color="error" />}
          </ErrorMessage>
        </Space>
      </Col>
    </Row>
  );
}

export default EditorField;
