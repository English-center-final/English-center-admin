import { message, Modal, Space } from 'antd';
import { branchApi } from 'api';
import ModalTitle from 'components/ModalTitle';
import { SelectedField } from 'customfield';
import InputField from 'customfield/InputField';
import {
  addBranch,
  fetchBranches,
  setBranchFormVisible,
  updateBranch,
} from 'features/Branch/branchSlice';
import { branchValues } from 'features/Branch/initialAndValidateValues';
import { FastField, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from 'utils/constants';

BranchAddForm.propTypes = {};

function BranchAddForm() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { selectedBranch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setBranchFormVisible(false));
  };

  const handleSubmit = async (values, actions) => {
    setConfirmLoading(true);
    const { id } = values;
    const branch = { ...values };
    try {
      if (id) {
        await handleUpdate(branch, actions);
      } else {
        await handleAdd(branch, actions);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setConfirmLoading(false);
      return;
    }
    setConfirmLoading(false);
    message.success(`${id ? 'Cập nhật' : 'Thêm'} thành công`);
    dispatch(setBranchFormVisible(false));
    dispatch(fetchBranches());
  };

  const handleAdd = async (branch, actions) => {
    const response = await branchApi.addBranch(branch);

    if (response.error) {
      actions.setErrors(response.error);
      throw new Error();
    }

    dispatch(addBranch(response));
  };

  const handleUpdate = async (branch, actions) => {
    const response = await branchApi.updateBranch(branch.id, branch);

    dispatch(updateBranch(response));

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
      title={<ModalTitle title={selectedBranch?.id && 'Cập nhật'} />}
      visible={true}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={handleSubmitClick}
      width={1000}
    >
      <Formik
        initialValues={selectedBranch}
        validationSchema={branchValues.validationSchema}
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
                  component={SelectedField}
                  options={constants.PROVINCES.map((ele) => ({
                    key: ele,
                    value: ele,
                  }))}
                  title="Cơ sở"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  placeholder="Ví dụ: TP. Hồ Chí Minh"
                  showSearch={true}
                />

                <FastField
                  name="address"
                  component={InputField}
                  title="Địa chỉ"
                  titleCol={6}
                  inputCol={18}
                  isRequire={true}
                  placeholder="Ví dụ: 12 Nguyễn Văn Bảo, Q. Gò Vấp, TP. Hồ Chí Minh"
                  maxLength={500}
                />
              </Space>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default BranchAddForm;
