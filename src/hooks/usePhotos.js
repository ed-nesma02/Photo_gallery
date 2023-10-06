import {useSelector} from 'react-redux';

export const usePhotos = ({page}) => {
  const photos = useSelector((state) => state.photos.photos);
  const searchPhotos = useSelector((state) => state.search.photos);
  const liked = useSelector((state) => state.liked.photos);
  if (page === 'search') {
    return [searchPhotos];
  }
  if (page === 'liked') {
    console.log('usePhotos');
    return [liked];
  }

  return [photos];
};
