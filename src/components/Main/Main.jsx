import style from './Main.module.css';

import {Layout} from '../Layout/Layout/Layout';
import {useSelector} from 'react-redux';
import {Photo} from './Photo/Photo';
import Masonry from 'react-masonry-css';

export const Main = () => {
  const photos = useSelector((state) => state.photos.photos);
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
        </Masonry>
      </Layout>
    </main>
  );
};
