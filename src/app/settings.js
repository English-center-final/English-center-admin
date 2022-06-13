import constants from 'utils/constants';

const settings = {
  api: {
    baseUrl: process.env.REACT_APP_JAVA_API_URL,
    endpoints: {
      auth: { url: '/auth/login' },
      me: { url: '/me' },
      topics: { url: '/admin/courses/topics' },
      words: { url: '/admin/courses/words' },
      courses: { url: '/admin/courses' },
      users: { url: '/admin/users' },
      books: { url: '/admin/exams/books' },
      exams: { url: '/admin/exams' },
      paragraphs: { url: '/admin/exams/paragraphs' },
      questions: { url: '/admin/exams/questions' },
      levels: { url: '/admin/levels' },
      classes: { url: '/admin/classes' },
      schedule: { url: '/admin/schedules' },
      branches: { url: '/admin/branches' },
    },
  },
  routes: {
    home: {
      url: '/admin',
      roles: [],
    },
    courses: {
      url: '/admin/courses',
      roles: [constants.Role.ADMIN, constants.Role.COURSE],
    },
    topics: {
      url: '/admin/courses/topics',
      roles: [constants.Role.ADMIN, constants.Role.COURSE],
    },
    exams: {
      url: '/admin/exams',
      roles: [constants.Role.ADMIN, constants.Role.EXAM],
    },
    users: {
      url: '/admin/users',
      roles: [constants.Role.ADMIN, constants.Role.COURSE],
    },
    books: {
      url: '/admin/books',
      roles: [constants.Role.ADMIN, constants.Role.EXAM],
    },
    levels: {
      url: '/admin/levels',
      roles: [constants.Role.ADMIN, constants.Role.CLASS],
    },
    classes: {
      url: '/admin/classes',
      roles: [constants.Role.ADMIN, constants.Role.CLASS],
    },
    registered: {
      url: '/admin/registered-students',
      roles: [constants.Role.ADMIN, constants.Role.CLASS],
    },

    // ----------
    me: {
      url: '/me',
      roles: [],
    },
    paragraphs: {
      url: '/exams/paragraphs',
      roles: [constants.Role.ADMIN, constants.Role.EXAM],
    },
    questions: {
      url: '/exams/questions',
      roles: [constants.Role.ADMIN, constants.Role.EXAM],
    },
    words: {
      url: '/courses/words',
      roles: [constants.Role.ADMIN, constants.Role.COURSE],
    },
    wordNoteCategories: {
      url: '/user/word-note-categories',
      roles: [constants.Role.USER],
    },
    branches: {
      url: '/admin/branches',
      roles: [constants.Role.USER],
    },
  },
  constants,
};
export default settings;
