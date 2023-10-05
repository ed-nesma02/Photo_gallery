import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ACCESS_KEY, API_URI} from '../../api/const';
import axios from 'axios';

export const photoRequestAsync = createAsyncThunk(
  'photo',
  async (id, {getState}) => {
    console.log(id);
    const {token, createdAt, scope, tokenType} = getState().token;
    const tokenStatus = getState().token.status;
    if (tokenStatus === 'fulfilled') {
      return axios(
        `${API_URI}photos/${id}?access_token=${token}&
        token_type=${tokenType}&scope=${scope}&created_at=${createdAt}`
      ).then(({data: photo}) => ({photo}));
    }
    return axios(`${API_URI}photos/${id}?client_id=${ACCESS_KEY}`).then(
      ({data: photo}) => ({photo})
    );
  }
);

const initialState = {
  status: 'idle',
  photo: {},
  error: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(photoRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(photoRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.photo = action.payload.photo;
        state.error = '';
      })
      .addCase(photoRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default photoSlice.reducer;
