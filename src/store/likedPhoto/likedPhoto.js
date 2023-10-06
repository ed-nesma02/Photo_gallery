import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URI} from '../../api/const';

export const likedPhotoRequestAsync = createAsyncThunk(
  'liked',
  async (value, {getState}) => {
    const {token, createdAt, scope, tokenType} = getState().token;
    const page = getState().liked.page;
    const {username} = getState().auth.authData;
    console.log('likedAsynk');
    return axios(
      `${API_URI}users/${username}/likes?page=${page}&access_token=${token}&
        client_id=${ACCESS_KEY}&token_type=${tokenType}&
        scope=${scope}&created_at=${createdAt}&per_page=30`
    ).then(({data: photos}) => ({photos}));
  }
);
const initialState = {
  status: 'idle',
  photos: [],
  page: 1,
  error: '',
};

export const likedPhotosSlice = createSlice({
  name: 'liked',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likedPhotoRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(likedPhotoRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.photos =
          state.page === 1 || state.query !== action.payload.query ?
          action.payload.photos :
          [...state.photos, ...action.payload.photos];
        state.page += 1;
        state.error = '';
      })
      .addCase(likedPhotoRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default likedPhotosSlice.reducer;
