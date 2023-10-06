import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ACCESS_KEY, API_URI} from '../../api/const';
import axios from 'axios';

export const searchRequestAsync = createAsyncThunk(
  'search',
  async (query, {getState}) => {
    const {token, createdAt, scope, tokenType} = getState().token;

    return axios(
      `${API_URI}search/photos?query=${query}&per_page=30&
        access_token=${token}&client_id=${ACCESS_KEY}&
        token_type=${tokenType}&scope=${scope}&created_at=${createdAt}`
    ).then(({data: results}) => {
      console.log(results.results);
      return {photos: results.results, query};
    });
  }
);
const initialState = {
  status: 'idle',
  query: '',
  photos: [],
  page: 1,
  error: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(searchRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        action.query = action.payload.query;
        state.photos =
          state.page === 1 || state.query !== action.payload.query ?
          action.payload.photos :
          [...state.photos, ...action.payload.photos];
        state.page += 1;
        state.error = '';
      })
      .addCase(searchRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default searchSlice.reducer;
