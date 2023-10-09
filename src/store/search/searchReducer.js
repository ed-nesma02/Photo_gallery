import {createAsyncThunk} from '@reduxjs/toolkit';
import {ACCESS_KEY, API_URI} from '../../api/const';
import axios from 'axios';
import {searchRequestSuccess, searchRequestSuccessAfter} from './searchSlice';

export const searchRequestAsync = createAsyncThunk(
  'search',
  async (query, {dispatch, getState}) => {
    const {token, createdAt, scope, tokenType} = getState().token;
    const lastPage = getState().search.lastPage;
    let page = getState().search.page;
    let querySearch = getState().search.query;
    if (lastPage && !query) return;
    if (query) {
      querySearch = query;
      page = 1;
    }

    return axios(
      `${API_URI}search/photos?query=${querySearch}&per_page=30&
        &page=${page}&access_token=${token}&client_id=${ACCESS_KEY}&
        token_type=${tokenType}&scope=${scope}&created_at=${createdAt}`
    ).then(({data: results}) => {
      if (query) {
        dispatch(
          searchRequestSuccess({photos: results.results, query: querySearch})
        );
      } else {
        dispatch(
          searchRequestSuccessAfter({
            photos: results.results,
            query: querySearch,
          })
        );
      }
    });
  }
);
