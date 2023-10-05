import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {photoRequestAsync} from '../store/photo/photoSlice';
import PropTypes from 'prop-types';

export const usePhoto = (id) => {
  const photo = useSelector((state) => state.photo.photo);
  const status = useSelector((state) => state.photo.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequestAsync(id));
  }, []);

  return [photo, status];
};

usePhoto.propTypes = {
  id: PropTypes.string,
};
