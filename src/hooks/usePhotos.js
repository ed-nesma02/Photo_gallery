import {useSelector} from 'react-redux';

export const usePhotos = ({page}) => {
  const photos = useSelector((state) => state.photos.photos);
  const searchPhotos = useSelector((state) => state.search.photos);
  const liked = useSelector((state) => state.liked.photos);
  const photosStatus = useSelector((state) => state.photos.status);
  const searchPhotosStatus = useSelector((state) => state.search.status);
  const likedStatus = useSelector((state) => state.liked.status);

  if (page === 'search') {
    return [searchPhotos, searchPhotosStatus];
  }
  if (page === 'liked') {
    return [liked, likedStatus];
  }

  return [photos, photosStatus];
};
