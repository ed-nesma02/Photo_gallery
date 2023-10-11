import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URI} from '../../api/const';

export const likeRequestAsync = createAsyncThunk(
  'like',
  async ({like, id}, {getState}) => {
    const {token, createdAt, scope, tokenType} = getState().token;
    return axios(
      `${API_URI}photos/${id}/like?access_token=${token}&
        client_id=${ACCESS_KEY}&token_type=${tokenType}&
        scope=${scope}&created_at=${createdAt}`,
      {
        method: `${like ? 'post' : 'delete'}`,
      }
    ).then(
      ({
        data: {
          photo: {liked_by_user: like, likes},
        },
      }) => ({like, likes})
    );
  }
);

const initialState = {
  status: 'idle',
  likes: '',
  like: '',
  error: '',
};

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(likeRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.likes = action.payload.likes;
        state.like = action.payload.like;
        state.error = '';
      })
      .addCase(likeRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default likeSlice.reducer;
