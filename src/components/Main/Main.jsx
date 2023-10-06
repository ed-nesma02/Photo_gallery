import style from './Main.module.css';

import {Layout} from '../Layout/Layout/Layout';
import {List} from './List/List';
import {Route, Routes} from 'react-router-dom';
import {Modal} from '../Modal/Modal';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/:page" element={<List />}>
          <Route path=":id" element={<Modal />} />
        </Route>
      </Routes>
    </Layout>
  </main>
);
