import Masonry from 'react-masonry-css';
import style from './List.module.css';
import {Photo} from '../Photo/Photo';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRef} from 'react';
import {Outlet, useParams} from 'react-router-dom';
import {usePhotos} from '../../../hooks/usePhotos';
import BarsLoader from '../../../UI/BarsLoader';
import {photosRequestAsync} from '../../../store/photos/photosReducer';
import {likedPhotoRequestAsync}
  from '../../../store/likedPhoto/likedPhotoReducer';
import {searchRequestAsync} from '../../../store/search/searchReducer';

export const List = () => {
  const {page} = useParams();
  const [photos, status] = usePhotos({page});
  const statusAuth = useSelector((state) => state.auth.status);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 'liked' && statusAuth === 'fulfilled') {
      dispatch(likedPhotoRequestAsync(true));
      return;
    }
    if (page === undefined) {
      dispatch(photosRequestAsync(true));
    }
  }, [page]);

  useEffect(() => {
    if (page === 'liked' && statusAuth === 'fulfilled') {
      dispatch(likedPhotoRequestAsync(true));
      return;
    }
  }, [statusAuth]);

  useEffect(() => {
    if (!photos.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === 'fulfilled') {
          if (page === 'search') {
            dispatch(searchRequestAsync());
            return;
          }
          if (page === 'liked') {
            dispatch(likedPhotoRequestAsync());
            return;
          }
          dispatch(photosRequestAsync());
        }
      },
      {
        rootMargin: '1000px',
      }
    );
    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current, status]);

  return (
    <>
      {status === 'rejected' && <p>Произошла ошибка</p>}
      {!photos.length && status === 'pending' && <BarsLoader />}
      <Masonry
        breakpointCols={{default: 3, 767: 1}}
        className={style.myMasonryGrid}
        columnClassName={style.myMasonryGridColumn}
      >
        {(photos.length || status === 'fulfilled') &&
          photos?.map((photo) => (
            <li key={photo.id} className={style.item}>
              <Photo photo={photo} />
            </li>
          ))}
        <li key="endElementListObserver" ref={endList}></li>
      </Masonry>
      <Outlet />
    </>
  );
};
