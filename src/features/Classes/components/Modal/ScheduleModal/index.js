import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { scheduleApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import {
  DatePickerField,
  InputField,
  SelectedField,
  TextAreaField,
} from 'customfield';
import { fetchSchedule } from 'features/Classes/classesSlice';
import { scheduleValues } from 'features/Classes/initialAndValidateValues';
import { courseValues } from 'features/Course/initialAndValidateValues';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

function ScheduleModal(props) {
  const dispatch = useDispatch();
  const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
    props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    const { id, ...valuesWithoutId } = values;

    const schedule = { ...valuesWithoutId };
    schedule.status = true;

    let response;

    try {
      if (isAddMode) {
        response = await scheduleApi.addSchedule(schedule);
      } else {
        response = await scheduleApi.updateSchedule(id, schedule);
      }

      if (response.error) {
        const error = response.error;
        for (const property in error) {
          message.error(`${property}: ${error?.[property]}`);
        }
      } else {
        message.success(`${isAddMode ? 'Thêm' : 'Cập nhật'} thành công`);

        dispatch(fetchSchedule({ classId: values.classId, query }));
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
        title={
          <ModalTitle
            title={isAddMode ? 'Thêm mới' : 'Cập nhật'}
            icon={isAddMode ? <PlusOutlined /> : <EditOutlined />}
          />
        }
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ top: 30 }}
        width="50vmax"
      >
        <Formik
          initialValues={initialValue}
          validationSchema={scheduleValues.validationSchema}
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
                    name="date"
                    component={DatePickerField}
                    title="Ngày học"
                    format="DD/MM/YYYY"
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                    rows={5}
                  />

                  <FastField
                    name="room"
                    component={InputField}
                    title="Phòng"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                  />

                  <FastField
                    name="session"
                    component={SelectedField}
                    title="Ca"
                    options={[1, 2, 3, 4, 5].map((session) => ({
                      key: `${session}`,
                      value: `Ca ${session}`,
                    }))}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                  />

                  <FastField
                    name="description"
                    component={TextAreaField}
                    title="Mô tả"
                    maxLength={500}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                    rows={5}
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
                        {isAddMode ? 'Thêm' : 'Lưu'}
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
ScheduleModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

ScheduleModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: courseValues.initial,
};
export default ScheduleModal;
