import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './token/tokenSlice';
import authReducer from './auth/authSlice';
import photosReducer from './photos/photosSlice';
import photoReducer from './photo/photoSlice';
import searchReducer from './search/searchSlice';
import likedPhotosReducer from './likedPhoto/likedPhotoSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosReducer,
    photo: photoReducer,
    search: searchReducer,
    liked: likedPhotosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
