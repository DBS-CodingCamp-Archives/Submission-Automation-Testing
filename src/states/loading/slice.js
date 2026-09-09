import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { count: 0 },
  reducers: {
    showLoading(state) {
      state.count += 1;
    },
    hideLoading(state) {
      if (state.count > 0) state.count -= 1;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export const selectIsLoading = (state) => state.loading.count > 0;

export default loadingSlice.reducer;
