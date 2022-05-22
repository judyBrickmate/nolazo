import { getToken } from '../../helpers/storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserService } from '../../services';
import { dataUpdateAdmin } from '../../services/types';

interface AdminState {
  admin: {
    //identityKey: string;
    role: string;
    name: string;
    phone: string;
    email: string;
    password: string;
  } | null;
  status: any;
  uploadStatus: 'loading' | 'success' | 'fail' | null;
}

const initialState: AdminState = {
  admin: null,
  status: null,
  uploadStatus: null,
};

export const createAdminUser = createAsyncThunk('post/admin', async (dataBody) => {
  return await UserService.createAdminUser(dataBody);
});

export const updateAdminUserInfo = createAsyncThunk('patch/admin', async ({ user, id, getMember }: any) => {
  try {
    const response = await UserService.updateUser(user, id);
    if (response.status === 200) {
      alert('변경되었습니다.');
      getMember();
      return response;
    }
  } catch (error) {
    alert('잠시 후에 다시 시도해주세요.');
    console.log('update error', error);
  }

  // const response = await UserService.updateUser(user, id);
  // if (response.status === 200) {
  //   alert('변경되었습니다.');
  //   return response;
  // }
});

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateUploadStatus: (state, action: PayloadAction<object>) => {
      const { uploadStatus }: any = action.payload;
      state.uploadStatus = uploadStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAdminUserInfo.pending, (state, action) => {
      state.uploadStatus = 'loading';
    }),
      builder.addCase(updateAdminUserInfo.fulfilled, (state, action: any) => {
        state.uploadStatus = 'success';
        state.admin = { ...state.admin, ...action.payload.data?.data };
      }),
      builder.addCase(updateAdminUserInfo.rejected, (state, action) => {
        state.uploadStatus = 'fail';
      });
  },
});
export const { updateUploadStatus } = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin;
export const adminReducer = adminSlice.reducer;
