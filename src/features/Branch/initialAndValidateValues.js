import * as Yup from 'yup';

export const branchValues = {
  initial: {
    name: 0,
    address: '',
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Chưa chọn cơ sở').min(2, 'Chưa chọn cơ sở'),
    address: Yup.string().required('Địa chỉ không được bỏ trống'),
  }),
};
