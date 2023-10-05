import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URI} from '../../api/const';

export const photosRequestAsync = createAsyncThunk(
  'photos',
  async (value, {getState}) => {
    const tokenStatus = getState().token.status;
    const pageNumber = getState().photos.page;
    const {token, createdAt, scope, tokenType} = getState().token;
    if (tokenStatus === 'fulfilled') {
      return axios(
        `${API_URI}photos?per_page=30&page=${pageNumber}&access_token=${token}&
        token_type=${tokenType}&scope=${scope}&created_at=${createdAt}`
      ).then(({data: photos}) => ({photos}));
    }
    return axios(
      `${API_URI}photos?client_id=${ACCESS_KEY}&per_page=30&page=${pageNumber}`
    ).then(({data: photos}) => ({photos}));
  }
);

const initialState = {
  status: 'idle',
  photos: [],
  page: 1,
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
        state.photos = [...state.photos, ...action.payload.photos];
        state.page += 1;
        state.error = '';
      })
      .addCase(photosRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default photosSlice.reducer;
