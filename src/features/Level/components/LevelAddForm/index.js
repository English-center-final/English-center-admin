import { message, Modal, Space } from 'antd';
import { levelApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import { EditorField, TextAreaField } from 'customfield';
import ImageField from 'customfield/ImageField';
import InputField from 'customfield/InputField';
import { levelValues } from 'features/Level/initialAndValidateValues';
import {
  addLevel,
  fetchLevels,
  setLevelFormVisible,
} from 'features/Level/levelSlice';
import { FastField, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

LevelAddForm.propTypes = {};

function LevelAddForm() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { selectedLevel } = useSelector((state) => state.level);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setLevelFormVisible(false));
  };

  const handleSubmit = async (values, actions) => {
    // console.log(values);
    setConfirmLoading(true);
    const { id, image } = values;
    const level = { ...values };

    delete level.image;

    let levelIdWasSave = id;

    try {
      if (id) {
        await handleUpdate(level, actions);
      } else {
        levelIdWasSave = await handleAddLevel(level, actions);
      }
      if (image && typeof image === 'object') {
        await levelApi.updateLevelImage(levelIdWasSave, image);
      }
    } catch (error) {
      console.log('loi');
      message.error('Có lỗi xảy ra');
      setConfirmLoading(false);
      return;
    }
    setConfirmLoading(false);
    message.success(`${id ? 'Cập nhật' : 'Thêm'} thành công`);
    dispatch(setLevelFormVisible(false));
    dispatch(fetchLevels());
  };

  const handleAddLevel = async (level, actions) => {
    const response = await levelApi.addLevel(level);

    if (response.error) {
      actions.setErrors(response.error);
      throw new Error();
    }

    dispatch(addLevel(response));
    return response.id;
  };

  const handleUpdate = async (level, actions) => {
    const response = await levelApi.updateLevel(level.id, level);

    if (response.error) {
      actions.setErrors(response.errors);
      throw new Error();
    }
    // message.success("Cập nhật thành công");

    // dispatch(setCategoryFormVisible(false));
  };

  const formRef = useRef();

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <Modal
      title={<ModalTitle title={selectedLevel.id && 'Cập nhật'} />}
      visible={true}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={handleSubmitClick}
      width={1000}
    >
      <Formik
        initialValues={selectedLevel}
        validationSchema={levelValues.validationSchema}
        innerRef={formRef}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {() => {
          {
            /* const { values, errors, touched, isSubmitting } = formikProps;
          console.log({ values, errors, touched, isSubmitting }); */
          }
          return (
            <Form>
              <Space
                size="large"
                direction="vertical"
                style={{ width: '100%' }}
              >
                <FastField
                  name="name"
                  component={InputField}
                  title="Tiêu đề"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  placeholder="Ví dụ: ETS 2021"
                />

                <FastField
                  name="image"
                  component={ImageField}
                  title="Ảnh"
                  titleCol={6}
                  inputCol={18}
                  heightPreview={200}
                  widthPreview={500}
                />

                <FastField
                  name="description"
                  component={TextAreaField}
                  title="Mô tả"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  placeholder="Ví dụ: ETS 2021"
                  maxLength={500}
                />

                <FastField
                  name="content"
                  component={EditorField}
                  title="Nội dung"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  placeholder="Ví dụ: ETS 2021"
                />
              </Space>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default LevelAddForm;
