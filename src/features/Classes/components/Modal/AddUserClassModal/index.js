import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { classApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import { SelectedField } from 'customfield';
import { fetchUserClasses } from 'features/Classes/classesSlice';
import { userClassValues } from 'features/Classes/initialAndValidateValues';
import { courseValues } from 'features/Course/initialAndValidateValues';
import { fetchUsers } from 'features/User/userSlice';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AddUserClassModal(props) {
  const dispatch = useDispatch();
  const { isModalVisible, setIsModalVisible, initialValue, query } = props;
  const { usersPage } = useSelector((state) => state.user);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      await classApi.addUserClass(values);

      message.success('Thêm thành công');

      dispatch(fetchUserClasses(query));
      handleCancel();
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    dispatch(fetchUsers({ page: 0, size: 9999 }));
  }, []);

  return (
    <div id="schedule-modal">
      <Modal
        title={<ModalTitle title="Thêm" icon={<PlusOutlined />} />}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 30 }}
        width="500px"
      >
        <Formik
          initialValues={initialValue}
          validationSchema={userClassValues.validationSchema}
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
                  <FastField
                    name="userId"
                    component={SelectedField}
                    title="Học viên"
                    options={usersPage?.data?.map((ele) => {
                      return {
                        key: ele?.id,
                        value: ele?.name,
                      };
                    })}
                    titleCol={6}
                    inputCol={18}
                    showSearch={true}
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
                        {'Thêm'}
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
AddUserClassModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

AddUserClassModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: courseValues.initial,
};
export default AddUserClassModal;
