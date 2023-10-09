import axios from 'axios';
import {ACCESS_KEY, API_URI} from '../../api/const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {photosRequestSuccess, photosRequestSuccessAfter} from './photosSlice';

export const photosRequestAsync = createAsyncThunk(
  'photos',
  async (firstPage, {dispatch, getState}) => {
    const tokenStatus = getState().token.status;
    let pageNumber = getState().photos.page;
    const {token, createdAt, scope, tokenType} = getState().token;
    if (firstPage) {
      pageNumber = 1;
    }

    if (tokenStatus === 'fulfilled') {
      return axios(
        `${API_URI}photos?per_page=30&page=${pageNumber}&access_token=${token}&
        token_type=${tokenType}&scope=${scope}&created_at=${createdAt}`
      )
        .then(({data: photos}) => {
          if (firstPage) {
            dispatch(photosRequestSuccess({photos}));
          } else {
            dispatch(photosRequestSuccessAfter({photos}));
          }
        });
    }
    return axios(
      `${API_URI}photos?client_id=${ACCESS_KEY}&per_page=30&page=${pageNumber}`
    )
      .then(({data: photos}) => {
        if (firstPage) {
          dispatch(photosRequestSuccess({photos}));
        } else {
          dispatch(photosRequestSuccessAfter({photos}));
        }
      });
  }
);
