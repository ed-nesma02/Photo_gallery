import {createAsyncThunk} from '@reduxjs/toolkit';
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
    ).then(({data: photo}) => ({photo}));
  }
);
