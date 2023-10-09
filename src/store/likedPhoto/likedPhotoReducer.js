import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ACCESS_KEY, API_URI} from '../../api/const';
import {likedPhotosSuccess, likedPhotosSuccessAfter} from './likedPhotoSlice';

export const likedPhotoRequestAsync = createAsyncThunk(
  'liked',
  async (firstPage, {dispatch, getState}) => {
    const {token, createdAt, scope, tokenType} = getState().token;
    let page = getState().liked.page;
    const {username} = getState().auth.authData;
    if (firstPage) {
      page = 1;
    }
    return axios(
      `${API_URI}users/${username}/likes?page=${page}&access_token=${token}&
        client_id=${ACCESS_KEY}&token_type=${tokenType}&
        scope=${scope}&created_at=${createdAt}&per_page=30`
    )
      .then(({data: photos}) => {
        if (firstPage) {
          dispatch(likedPhotosSuccess({photos}));
        } else {
          dispatch(likedPhotosSuccessAfter({photos}));
        }
      })
      .catch((error) => ({error}));
  }
);
