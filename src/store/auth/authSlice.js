import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URI} from '../../api/const';

export const authRequestAsync = createAsyncThunk(
  'auth',
  (status, {getState}) => {
    const {token, createdAt, scope, tokenType} = getState().token;
    return axios(
      `${API_URI}me?access_token=${token}&token_type=${tokenType}
        &scope=${scope}&created_at=${createdAt}`,
      {
        Authorization: `${tokenType} ${token}`,
      }
    )
      .then(
        ({
          data: {
            name,
            profile_image: {large: photo},
          },
        }) => {
          const authData = {name, photo};
          console.log('asd', authData);
          return {authData};
        }
      );
  }
);

const initialState = {
  status: 'idle',
  authData: '',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(authRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.authData = action.payload.authData;
        state.error = '';
      })
      .addCase(authRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
