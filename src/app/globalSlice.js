import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import meApi from 'api/meApi';
import { message } from 'antd';

const KEY = 'global';

export const fetchNameRoles = createAsyncThunk(
  `${KEY}/fetchNameRoles`,
  async () => {
    const nameRolesResult = await meApi.fetchNameRoles();

    return nameRolesResult;
  }
);
export const fetchUserProfile = createAsyncThunk(
  `${KEY}/fetchUserProfile`,
  async () => {
    const user = await meApi.fetchProfile();
    console.log('user', user);
    return user;
  }
);

const globalSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isLogin: false,
    name: '',
    avatar: '',
    roles: [],
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setDefaultLogin: (state) => {
      state.isLogin = false;
      state.name = '';
      state.name = '';
      state.avatar = '';
      state.roles = [];
    },
  },

  extraReducers: {
    [fetchNameRoles.fulfilled]: (state, action) => {
      const { name, roles } = action.payload;
      console.log('fetchNameRoles: ', roles);
      const index = roles.findIndex((roleEle) => roleEle !== 'ROLE_USER');
      if (index === -1) {
        state.isLogin = false;
        message.error('Tài khoản không có quyền truy cập');
        localStorage.removeItem('kltn-token');
      } else {
        state.isLogin = true;
        state.name = name;
        state.roles = roles;
      }
    },
    [fetchNameRoles.rejected]: (state) => {
      state.isLogin = false;
      // localStorage.removeItem('kltn-token');
    },
    // avatar
    [fetchUserProfile.fulfilled]: (state, action) => {
      const { image, actived } = action.payload;
      console.log('fetchUserProfile: ', action.payload);
      state.avatar = image;
      if (!actived) {
        state.isLogin = false;
        message.error('Tài khoản chưa được kích hoạt');
        localStorage.removeItem('kltn-token');
      }
    },
    [fetchUserProfile.rejected]: (state) => {
      state.isLogin = false;
    },
  },
});

const { reducer, actions } = globalSlice;
export const { setLoading, setLogin, setDefaultLogin } = actions;
export default reducer;
