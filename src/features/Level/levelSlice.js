import { levelApi } from 'api';
import { levelValues } from './initialAndValidateValues';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const KEY = 'route';

export const fetchLevels = createAsyncThunk('fetchLevels', async () => {
  const response = await levelApi.fetchLevels();
  return response;
});

export const fetchLevelBySlug = createAsyncThunk(
  'fetchLevelBySlug',
  async (params) => {
    const { slug } = params;
    const response = await levelApi.fetchLevel(slug);
    return response;
  }
);

const levelSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    levels: [],
    isLevelFormVisible: false,
    selectedLevel: levelValues.initial,
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setLevelFormVisible: (state, action) => {
      state.isLevelFormVisible = action.payload;
    },

    setSelectedLevel: (state, action) => {
      state.selectedLevel = action.payload;
    },

    addLevel: (state, action) => {
      state.levels.push(action.payload);
    },

    updateLevel: (state, action) => {
      const index = state.levels.findIndex(
        (ele) => ele.id === action.payload.id
      );

      state.levels[index] = action.payload;
    },

    deleteLevel: (state, action) => {
      const newLevels = state.levels.filter((ele) => ele.id !== action.payload);
      state.levels = newLevels;
    },
  },
  extraReducers: {
    // fetchLevels
    [fetchLevels.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchLevels.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLevels.fulfilled]: (state, action) => {
      state.levels = action.payload;
      state.isLoading = false;
    },

    // fetchLevelBySlug
    [fetchLevelBySlug.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchLevelBySlug.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLevelBySlug.fulfilled]: (state, action) => {
      state.selectedLevel = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = levelSlice;
export const {
  setLoading,
  setLevelFormVisible,
  setSelectedLevel,
  addLevel,
  updateLevel,
  deleteLevel,
} = actions;
export default reducer;
