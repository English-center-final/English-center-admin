import { branchApi } from 'api';
import { branchValues } from './initialAndValidateValues';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const KEY = 'route';

export const fetchBranches = createAsyncThunk('fetchBranches', async () => {
  const response = await branchApi.fetchBranches();
  return response;
});

const branchSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    branches: [],
    isBranchFormVisible: false,
    selectedBranch: branchValues.initial,
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setBranchFormVisible: (state, action) => {
      state.isBranchFormVisible = action.payload;
    },

    setSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },

    addBranch: (state, action) => {
      state.branches.push(action.payload);
    },

    updateBranch: (state, action) => {
      const index = state.branches.findIndex(
        (ele) => ele.id === action.payload.id
      );

      state.branches[index] = action.payload;
    },

    deleteBranch: (state, action) => {
      const newBranches = state.branches.filter(
        (ele) => ele.id !== action.payload
      );
      state.branches = newBranches;
    },
  },
  extraReducers: {
    // fetchBranches
    [fetchBranches.rejected]: (state) => {
      state.isLoading = false;
    },

    [fetchBranches.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchBranches.fulfilled]: (state, action) => {
      state.branches = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = branchSlice;
export const {
  setLoading,
  setBranchFormVisible,
  setSelectedBranch,
  addBranch,
  updateBranch,
  deleteBranch,
} = actions;
export default reducer;
