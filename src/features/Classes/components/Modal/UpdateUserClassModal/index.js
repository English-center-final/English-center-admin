import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Text from 'antd/lib/typography/Text';
import { classApi, scheduleApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import { SelectedField } from 'customfield';
import { fetchUserClasses } from 'features/Classes/classesSlice';
import { courseValues } from 'features/Course/initialAndValidateValues';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import commonFuc from 'utils/commonFuc';

function UpdateUserClassModal(props) {
  const dispatch = useDispatch();
  const { isModalVisible, setIsModalVisible, initialValue, query } = props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    delete values.name;
    delete values.email;
    delete values.phoneNumber;

    try {
      const response = await classApi.updateUserClass(values);

      if (response.error) {
        const error = response.error;
        for (const property in error) {
          message.error(`${property}: ${error?.[property]}`);
        }
      } else {
        message.success('Cập nhật thành công');

        dispatch(fetchUserClasses(query));
        handleCancel();
      }
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <div id="schedule-modal">
      <Modal
        title={<ModalTitle title="Cập nhật" icon={<EditOutlined />} />}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 30 }}
        width="500px"
      >
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formikProps) => {
            const { isSubmitting } = formikProps;
            return (
              <Form>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  <Space
                    direction="vertical"
                    style={{ width: '100%' }}
                    size="small"
                  >
                    <Text>
                      <strong>Họ tên:</strong> {initialValue.name}
                    </Text>
                    <Text>
                      <strong>Email:</strong> {initialValue.email}
                    </Text>
                    <Text>
                      <strong>Số điện thoại:</strong> {initialValue.phoneNumber}
                    </Text>
                  </Space>

                  <FastField
                    name="status"
                    component={SelectedField}
                    title="Trạng thái"
                    options={commonFuc
                      .getListState(initialValue.status)
                      .map((ele) => {
                        return {
                          key: ele.key,
                          value: ele.value,
                        };
                      })}
                    titleCol={6}
                    inputCol={18}
                    firstRow={false}
                  />
                </Space>
                <Row justify="end" style={{ marginTop: '20px' }}>
                  <Col>
                    <Space size="middle">
                      <Button onClick={handleCancel}>Hủy</Button>

                      <Button htmlType="submit" type="primary">
                        {isSubmitting && (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{ color: 'white' }}
                                spin
                              />
                            }
                          />
                        )}
                        {'Lưu'}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
}
UpdateUserClassModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

UpdateUserClassModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: courseValues.initial,
};
export default UpdateUserClassModal;
