import {Layout} from '../Layout/Layout/Layout';
import {Auth} from './Auth/Auth';
import style from './Header.module.css';
import {Logo} from './Logo/Logo';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <nav className={style.nav}>
        <Logo />
        <Auth />
      </nav>
    </Layout>
  </header>
);
