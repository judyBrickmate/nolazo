import { getToken, setToken } from '../../helpers/storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserService } from '../../services';
import { ROUTER } from '../../router/routes';

interface UserState {
  user: {
    accessToken: string;
    refreshToken: string;
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    birthDay: string;
    profileImage?: any;
    categoryIds?: [number];
    deviceToken?: string;
    role?: string;
  } | null;

  isLogin: boolean;
  status: 'loading' | 'success' | 'fail' | null;
}

const initialState: UserState = {
  user: null,
  isLogin: !!getToken(),
  status: null,
};

export const getUserById = createAsyncThunk('get/user', async ({ id }: any) => {
  return await UserService.getUserById(id);
});

export const login = createAsyncThunk('user/login', async ({ id, password, setToken, setUserRole }: any) => {
  try {
    const response = await UserService.login(id, password);
    if (response.data && response.status === 201) {
      setToken(response?.data.data?.accessToken);
      setUserRole(response?.data.data?.role);

      return response.data?.data;
    }
    console.log(response);
  } catch (error: any) {
    if (error?.response.data.errorCode === 1001) {
      alert('비밀번호가 틀렸습니다. 다시 시도해주세요.');
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      const { isLogin, user } = action.payload;
      if (!isLogin) {
        state.user = user;
        state.isLogin = isLogin;
      } else {
        state.user = { ...state.user, ...user };
        state.isLogin = isLogin;
      }
    },
    updateIsLogin: (state, action: PayloadAction<any>) => {
      const { login } = action.payload;
      state.isLogin = login;
    },
    updateUserInfo: (state, action: PayloadAction<any>) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = 'loading';
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        console.log(action);

        state.isLogin = true;
        state.status = 'success';
        state.user = action.payload;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.status = 'fail';
        state.isLogin = false;
        state.user = null;
      });
  },
});
export const { setUserInfo, updateIsLogin, updateUserInfo } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;
