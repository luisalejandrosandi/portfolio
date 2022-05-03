import { createSlice } from '@reduxjs/toolkit';

export const rotateSlice = createSlice({
  name: 'rotate',
  initialState: {
    rotate: {
      current: 'home',
      next: 'projects',
      degrees: {current: 0, next: 90},
      preload: true,
    }
  },
  reducers: {
    setRotate: (state, action) => {
      state.rotate = action.payload
    }
  }
})

export const { setRotate } = rotateSlice.actions;

export default rotateSlice.reducer;