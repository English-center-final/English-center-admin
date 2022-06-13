import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { userApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import { InputField } from 'customfield';
import { userValues } from 'features/User/initialAndValidateValues';
import { fetchUsers } from 'features/User/userSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

function UserModal(props) {
  const dispatch = useDispatch();
  const { isModalVisible, setIsModalVisible, query } = props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await userApi.addUser(values);

      if (response.error) {
        const error = response.error;
        for (const property in error) {
          message.error(`${property}: ${error?.[property]}`);
        }
      } else {
        message.success('Thêm thành công');
        handleCancel();
        dispatch(fetchUsers(query));
      }
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  return (
    <div id="blog-add-page">
      <Modal
        title={<ModalTitle title={'Thêm mới'} icon={<PlusOutlined />} />}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={userValues.initial}
          validationSchema={userValues.validationSchema}
          onSubmit={handleSubmit}
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
                  <FastField
                    name="name"
                    component={InputField}
                    title="Tên"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                    placeholder="Vd: Nguyễn Văn A"
                  />
                  <FastField
                    name="username"
                    component={InputField}
                    title="Tài khoản"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                    placeholder="Vd: User"
                  />
                  <FastField
                    name="phoneNumber"
                    component={InputField}
                    title="Số điện thoại"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                    placeholder="Vd: 0987654321"
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
                        Thêm
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
UserModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  query: PropTypes.object,
};

UserModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  query: {
    username: '',
    page: 0,
    size: 10,
  },
};
export default UserModal;
