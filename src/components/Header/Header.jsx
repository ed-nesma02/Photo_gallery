import {Layout} from '../Layout/Layout/Layout';
import {Auth} from './Auth/Auth';
import style from './Header.module.css';
import {Logo} from './Logo/Logo';
import {Search} from './Search/Search';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <nav className={style.nav}>
        <Logo />
        <Search />
        <Auth />
      </nav>
    </Layout>
  </header>
);
