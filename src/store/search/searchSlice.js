import {createSlice} from '@reduxjs/toolkit';
import {searchRequestAsync} from './searchReducer';

const initialState = {
  status: 'idle',
  query: '',
  photos: [],
  page: 1,
  error: '',
  lastPage: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchRequestSuccess(state, action) {
      state.status = 'fulfilled';
      state.query = action.payload.query;
      state.photos = action.payload.photos;
      state.lastPage = false;
      state.page = 2;
      state.error = '';
    },
    searchRequestSuccessAfter(state, action) {
      state.status = 'fulfilled';
      state.query = action.payload.query;
      state.photos = [...state.photos, ...action.payload.photos];
      state.lastPage = !action.payload.photos.lenght;
      state.page += 1;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(searchRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default searchSlice.reducer;
export const {searchRequestSuccess, searchRequestSuccessAfter} =
  searchSlice.actions;
