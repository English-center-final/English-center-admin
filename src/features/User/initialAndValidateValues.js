import * as Yup from 'yup';

export const userValues = {
  initial: {
    name: '',
    username: '',
    password: '12345678',
    phoneNumber: '',
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Tên không được bỏ trống'),
    username: Yup.string().required('Tài khoản không được bỏ trống'),
    phoneNumber: Yup.string().required('Số điện thoại không được bỏ trống'),
  }),
};
