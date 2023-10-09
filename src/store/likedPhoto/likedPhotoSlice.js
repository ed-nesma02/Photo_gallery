import {createSlice} from '@reduxjs/toolkit';
import {likedPhotoRequestAsync} from './likedPhotoReducer';

const initialState = {
  status: 'idle',
  photos: [],
  page: 1,
  error: '',
  lastPage: false,
};

export const likedPhotosSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {
    likedPhotosSuccess(state, action) {
      state.status = 'fulfilled';
      state.photos = action.payload.photos;
      state.page = 2;
      state.lastPage = false;
      state.error = '';
    },
    likedPhotosSuccessAfter(state, action) {
      state.status = 'fulfilled';
      state.photos = [...state.photos, ...action.payload.photos];
      state.page += 1;
      state.lastPage = !action.payload.photos.lenght;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(likedPhotoRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(likedPhotoRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default likedPhotosSlice.reducer;
export const {likedPhotosSuccess, likedPhotosSuccessAfter} =
  likedPhotosSlice.actions;
