import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = null;

export const asyncSetAuthUser = createAsyncThunk(
  'authUser/set',
  async ({ email, password }) => {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();
    return authUser;
  }
);

export const asyncUnsetAuthUser = createAsyncThunk(
  'authUser/unset',
  async () => {
    api.putAccessToken('');
    return null;
  }
);

const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      return action.payload;
    },
    unsetAuthUser() {
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(asyncUnsetAuthUser.fulfilled, () => {
        return null;
      });
  }
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export default authUserSlice.reducer;
