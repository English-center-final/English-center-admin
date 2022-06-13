import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { classApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import {
  DatePickerField,
  InputField,
  SelectedField,
  TextAreaField,
} from 'customfield';
import SelectMultiField from 'customfield/SelectMultiField';
import SelectOptionField from 'customfield/SelectOptionField';
import { fetchClasses } from 'features/Classes/classesSlice';
import { classesValues } from 'features/Classes/initialAndValidateValues';
import { courseValues } from 'features/Course/initialAndValidateValues';
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';

function ClassesModal(props) {
  const dispatch = useDispatch();
  const { levels } = useSelector((state) => state.level);
  const { branches } = useSelector((state) => state.branch);

  const { isModalVisible, setIsModalVisible, isAddMode, initialValue, query } =
    props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    const { id, ...valuesWithoutId } = values;

    const dateString = valuesWithoutId.date.join(', ');

    const classes = { ...valuesWithoutId };
    classes.date = dateString;
    delete classes.numOfRegister;
    delete classes.levelName;

    let response;

    try {
      if (isAddMode) {
        response = await classApi.addClass(classes);
      } else {
        response = await classApi.updateClass(id, classes);
      }
      if (response.error) {
        const error = response.error;
        for (const property in error) {
          message.error(`${property}: ${error?.[property]}`);
        }
      } else {
        message.success(`${isAddMode ? 'Thêm' : 'Cập nhật'} thành công`);
        dispatch(fetchClasses(query));
        handleCancel();
      }
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra');
    }

    // if (response.error) {
    //   const error = response.error;
    //   for (const property in error) {
    //     message.error(error[property]);
    //   }
    // } else {
    //   message.info(typeof image);
    //   if (image && typeof image === 'object') {
    //     const courseId = isAddMode ? response.id : id;
    //     await courseApi.updateCourseImage(courseId, image);
    //   }
    // }
  };

  return (
    <div id="classes-modal">
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
          validationSchema={classesValues.validationSchema}
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
                  {!isAddMode && (
                    <FastField
                      name="status"
                      component={SelectedField}
                      title="Trạng thái"
                      options={Object.values(constants.ClassStatus).map(
                        (ele) => ({
                          key: ele.key,
                          value: ele.value,
                        })
                      )}
                      titleCol={6}
                      inputCol={18}
                      isRequire={true}
                    />
                  )}

                  <FastField
                    name="amount"
                    component={InputField}
                    title="Số lượng học viên"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                    type="number"
                  />

                  <FastField
                    name="dateStart"
                    component={DatePickerField}
                    title="Ngày bắt đầu"
                    format="DD/MM/YYYY"
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                    rows={5}
                  />

                  <FastField
                    name="numOfLessons"
                    component={InputField}
                    title="Số buổi"
                    titleCol={6}
                    maxLength={200}
                    inputCol={18}
                    isRequire={true}
                    type="number"
                  />

                  <FastField
                    name="levelId"
                    component={SelectedField}
                    title="Khoá học"
                    options={levels.map((level) => ({
                      key: level.id,
                      value: level.name,
                    }))}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                  />

                  <FastField
                    name="date"
                    component={SelectMultiField}
                    title="Ngày học"
                    options={Object.values(constants.DayOfWeek).map((day) => ({
                      key: day.key,
                      value: day.value,
                    }))}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
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
                    options={[1, 2, 3, 4].map((session) => ({
                      key: `${session}`,
                      value: `Ca ${session}`,
                    }))}
                    titleCol={6}
                    inputCol={18}
                    isRequire={true}
                  />

                  <FastField
                    name="branchId"
                    component={SelectOptionField}
                    title="Cơ sở"
                    optionGroups={commonFuc.groupBranch(branches)}
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
ClassesModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
  isAddMode: PropTypes.bool,
  initialValue: PropTypes.object,
  query: PropTypes.object,
};

ClassesModal.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: null,
  isAddMode: true,
  initialValue: courseValues.initial,
};
export default ClassesModal;
