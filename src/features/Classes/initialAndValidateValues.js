import commonFuc from 'utils/commonFuc';
import constants from 'utils/constants';
import * as Yup from 'yup';

export const classesValues = {
  initial: {
    amount: 20,
    dateStart: commonFuc.getNext7day(),
    numOfLessons: 30,
    status: constants.ClassStatus.ONGOING.key,
    description: '',
    date: [],
    levelId: 0,
    branchId: 0,
    room: '',
    session: '',
  },

  validationSchema: Yup.object().shape({
    amount: Yup.number().min(1, 'Số lượng không được bỏ trống'),
    dateStart: Yup.string().required('Ngày bắt đầu không được bỏ trống'),
    numOfLessons: Yup.number().min(1, 'Số buổi học không được bỏ trống'),
    status: Yup.string().required('Trạng thái không được bỏ trống'),
    description: Yup.string().required('Mô tả không được bỏ trống'),
    date: Yup.array().required('Ngày học không được bỏ trống'),
    levelId: Yup.number().min(1, 'Chưa chọn khoá học'),
    branchId: Yup.number('Chưa chọn cơ sở').min(1, 'Chưa chọn cơ sở'),
    room: Yup.string().required('Phòng học không được bỏ trống'),
    session: Yup.string().required('Ca học không được bỏ trống'),
  }),
};

export const scheduleValues = {
  initial: {
    date: commonFuc.formatDate(Date().toString()),
    status: true,
    room: '',
    session: '',
    description: '',
    classId: 0,
  },

  validationSchema: Yup.object().shape({
    date: Yup.string().required('Ngày học không được bỏ trống'),
    description: Yup.string().required('Mô tả không được bỏ trống'),
    room: Yup.string().required('Phòng học không được bỏ trống'),
    session: Yup.string().required('Ca học không được bỏ trống'),
  }),
};

export const userClassValues = {
  initial: {
    userId: 0,
    status: constants.UserClassStatus.NEW.key,
    classesId: 0,
  },

  validationSchema: Yup.object().shape({
    userId: Yup.number().min(1, 'Không được bỏ trống'),
    classesId: Yup.number().min(1, 'Không được bỏ trống'),
  }),
};

export const courseValues = {
  initial: {
    id: 0,
    name: '',
    image: '',
    description: '',
    topicId: 0,
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Tên khóa học không được bỏ trống'),
    description: Yup.string().required('Mô tả không được bỏ trống'),
    topicId: Yup.number().min(1, 'Chủ đề không được bỏ trống'),
  }),
};

export const topicValues = {
  initial: {
    id: 0,
    name: '',
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Tên chủ đề không được bỏ trống'),
  }),
};
export const wordValues = {
  initial: {
    id: 0,
    name: '',
    mean: '',
    type: '',
    pronounce: '',
    sound: '',
    definition: '',
    example: '',
    image: '',
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Từ vựng không được bỏ trống'),
    type: Yup.string().required('Loại từ không được bỏ trống'),
    pronounce: Yup.string().required('Phát âm không được bỏ trống'),
    definition: Yup.string().required('Định nghĩa không được bỏ trống'),
    example: Yup.string().required('Ví dụ không được bỏ trống'),
    mean: Yup.string().required('Nghĩa không được bỏ trống'),
  }),
};
