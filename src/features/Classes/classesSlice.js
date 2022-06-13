import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { classApi, courseApi, scheduleApi, topicApi, wordApi } from 'api';
import { courseValues, topicValues } from './initialAndValidateValues';

const KEY = 'classes';

export const fetchClasses = createAsyncThunk(
  `${KEY}/fetchClasses`,
  async (params) => {
    const data = await classApi.fetchClasses(params);
    return data;
  }
);

export const fetchClassById = createAsyncThunk(
  `${KEY}/fetchClassById`,
  async (params) => {
    const data = await classApi.fetchClassById(params);
    return data;
  }
);

export const fetchSchedule = createAsyncThunk(
  `${KEY}/fetchSchedule`,
  async (params) => {
    const { classId, query } = params;
    const data = await scheduleApi.fetchSchedules(classId, query);
    return data;
  }
);

export const fetchUserClasses = createAsyncThunk(
  `${KEY}/fetchUserClasses`,
  async (params) => {
    const data = await classApi.fetchUserClasses(params);
    return data;
  }
);

const classesSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    classesPage: {},
    classDetail: {},
    schedulePage: {},
    userClassPage: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedBlogDefault: (state) => {
      state.selectedCourse = courseValues.initial;
    },
    setSelectedTopicDefault: (state) => {
      state.selectedTopic = topicValues.initial;
    },
  },
  extraReducers: {
    // TODO <====================== fetchClasses ======================>
    [fetchClasses.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchClasses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classesPage = action.payload;
    },
    [fetchClasses.rejected]: (state) => {
      state.isLoading = false;
    },

    // TODO <====================== fetchClassById ======================>
    [fetchClassById.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchClassById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.classDetail = action.payload;
    },
    [fetchClassById.rejected]: (state) => {
      state.isLoading = false;
    },

    // TODO <====================== fetchSchedule ======================>
    [fetchSchedule.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchSchedule.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.schedulePage = action.payload;
    },
    [fetchSchedule.rejected]: (state) => {
      state.isLoading = false;
    },

    // TODO <====================== fetchUserClasses ======================>
    [fetchUserClasses.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchUserClasses.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userClassPage = action.payload;
    },
    [fetchUserClasses.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = classesSlice;
export const { setLoading } = actions;
export default reducer;
