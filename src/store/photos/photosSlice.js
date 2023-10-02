import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URI} from '../../api/const';

export const photosRequestAsync = createAsyncThunk('photos', async () => {
  console.log();
  return axios(`${API_URI}photos?client_id=${ACCESS_KEY}&per_page=30`).then(
    ({data: photos}) => ({photos}));
});

const initialState = {
  status: 'idle',
  photos: [],
  error: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(photosRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(photosRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.photos = action.payload.photos;
        state.error = '';
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default photosSlice.reducer;
