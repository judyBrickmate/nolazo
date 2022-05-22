import { userReducer } from './slices/userSlice';
import { alertReducer } from './slices/alertSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './slices/adminSlice';

const rootReducer = combineReducers({
  user: userReducer,
  appAlert: alertReducer,
  admin: adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
