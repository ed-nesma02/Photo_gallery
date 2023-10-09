import {createSlice} from '@reduxjs/toolkit';
import {photosRequestAsync} from './photosReducer';

const initialState = {
  status: 'idle',
  photos: [],
  page: 1,
  error: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    photosRequestSuccess(state, action) {
      state.status = 'fulfilled';
      state.photos = action.payload.photos;
      state.page = 2;
      state.error = '';
    },
    photosRequestSuccessAfter(state, action) {
      state.status = 'fulfilled';
      state.photos = [...state.photos, ...action.payload.photos];
      state.page += 1;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default photosSlice.reducer;
export const {photosRequestSuccess, photosRequestSuccessAfter} =
  photosSlice.actions;
