import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthUser } from '../authUser/slice';
import api from '../../utils/api';

const initialState = true;

export const asyncPreloadProcess = createAsyncThunk(
  'isPreload/process',
  async (_, { dispatch }) => {
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      console.log(error);
      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  },
);

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState,
  reducers: {
    setIsPreload(state, action) {
      return action.payload;
    },
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export default isPreloadSlice.reducer;
