import { configureStore } from '@reduxjs/toolkit';
import book from 'features/Book/bookSlice';
import course from 'features/Course/courseSlice';
import exam from 'features/Exam/examSlice';
import login from 'features/Login/loginSlice';
import user from 'features/User/userSlice';
import level from 'features/Level/levelSlice';
import branch from 'features/Branch/branchSlice';
import classes from 'features/Classes/classesSlice';
import global from './globalSlice';

const rootReducer = {
  global,
  login,
  exam,
  user,
  book,
  course,
  level,
  classes,
  branch,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
