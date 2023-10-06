import Masonry from 'react-masonry-css';
import style from './List.module.css';
import {Photo} from '../Photo/Photo';
import {photosRequestAsync} from '../../../store/photos/photosSlice';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useRef} from 'react';
import {Outlet, useParams} from 'react-router-dom';
import {usePhotos} from '../../../hooks/usePhotos';
import {searchRequestAsync} from '../../../store/search/searchSlice';
import {likedPhotoRequestAsync} from '../../../store/likedPhoto/likedPhoto';

export const List = () => {
  const {page} = useParams();
  const [photos] = usePhotos({page});
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 'search') {
      dispatch(searchRequestAsync());
      return;
    }
    if (page === 'liked') {
      dispatch(likedPhotoRequestAsync());
      return;
    }
    dispatch(photosRequestAsync());
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
  }, [endList.current]);

  return (
    <>
      <Masonry
        breakpointCols={{default: 3}}
        className={style.myMasonryGrid}
        columnClassName={style.myMasonryGridColumn}
      >
        {photos?.map((photo) => (
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
