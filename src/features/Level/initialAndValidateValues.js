import * as Yup from 'yup';

export const levelValues = {
  initial: {
    name: '',
    description: '',
    content: '',
    image: '',
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Tên không được bỏ trống'),
    description: Yup.string().required('Mô tả được bỏ trống'),
    content: Yup.string().required('Nội dung được bỏ trống'),
  }),
};
