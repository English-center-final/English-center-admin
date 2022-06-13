import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { examApi, questionApi } from 'api';

const KEY = 'exam';

export const fetchBooks = createAsyncThunk(`${KEY}/fetchBooks`, async () => {
  const data = await examApi.fetchBooks();
  return data;
});

export const fetchExams = createAsyncThunk(
  `${KEY}/fetchExams`,
  async (params) => {
    const data = await examApi.fetchExams(params);
    return data;
  }
);

export const deleteExam = createAsyncThunk(
  `${KEY}/deleteVideo`,
  async (params) => {
    const { examId } = params;
    await examApi.deleteExam(examId);
    return examId;
  }
);

export const fetchQuestions = createAsyncThunk(
  `${KEY}/fetchQuestions`,
  async (params) => {
    const data = await questionApi.fetchQuestions(params);
    return data;
  }
);

const examSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    examsPage: {},
    questions: [],
    books: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchExams.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchExams.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.examsPage = action.payload;
    },
    [fetchQuestions.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchQuestions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.questions = action.payload;
    },
    [fetchBooks.pending]: (state) => {
      state.isLoading = true;
    },

    [fetchBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [deleteExam.pending]: (state) => {
      state.isLoading = true;
    },

    [deleteExam.fulfilled]: (state) => {
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = examSlice;
export const { setLoading } = actions;
export default reducer;
