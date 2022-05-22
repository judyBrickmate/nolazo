import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AlertState {
  isVisible: boolean;
  type?: 'success' | 'info' | 'warning' | 'error';
  description?: string;
}

// Define the initial state using that type
const initialState: AlertState = {
  isVisible: false,
  type: 'success',
  description: 'description',
};

export const alertSlice = createSlice({
  name: 'alertSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.isVisible = action.payload.isVisible;
      state.type = action.payload.type;
      state.description = action.payload.description;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAlert = (state: RootState) => state.appAlert;

// Action creators are generated for each case reducer function
export const { showAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
