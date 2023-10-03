import style from './Main.module.css';

import {Layout} from '../Layout/Layout/Layout';
import {useDispatch, useSelector} from 'react-redux';
import {Photo} from './Photo/Photo';
import Masonry from 'react-masonry-css';
import {useEffect, useRef} from 'react';
import {photosRequestAsync} from '../../store/photos/photosSlice';

export const Main = () => {
  const photos = useSelector((state) => state.photos.photos);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!photos.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('вижу');
          dispatch(photosRequestAsync());
        }
      },
      {
        rootMargin: '1000px',
      }
    );
    observer.observe(endList.current);
  }, [endList.current]);

  return (
    <main className={style.main}>
      <Layout>
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
      </Layout>
    </main>
  );
};
