import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {urlToken} from '../../api/auth';
import {setToken} from '../../api/token';

export const tokenRequestAsync = createAsyncThunk('token', () => {
  const code = location.search.replace('?code=', '');
  return axios(`${urlToken}&code=${code}`, {
    method: 'post',
  })
    .then(
      ({
        data: {
          access_token: token,
          created_at: createdAt,
          scope,
          token_type: tokenType,
        },
      }) => {
        setToken({token, createdAt, scope, tokenType});
        return {token, createdAt, scope, tokenType};
      }
    )
    .catch((err) => {
      setToken();
      return err;
    });
});

const initialState = {
  status: 'idle',
  token: '',
  tokenType: '',
  scope: '',
  createdAt: '',
  error: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken(state, action) {
      state.token = action.payload.token;
      state.tokenType = action.payload.tokenType;
      state.createdAt = action.payload.createdAt;
      state.scope = action.payload.scope;
      state.status = action.payload.token ? 'fulfilled' : 'idle';
    },
    deleteToken(state) {
      state.token = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tokenRequestAsync.pending, (state) => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(tokenRequestAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.token = action.payload.token;
        state.tokenType = action.payload.tokenType;
        state.createdAt = action.payload.createdAt;
        state.scope = action.payload.scope;
        state.error = '';
      })
      .addCase(tokenRequestAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error;
      });
  },
});

export default tokenSlice.reducer;
export const {updateToken} = tokenSlice.actions;
