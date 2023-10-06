import {Link} from 'react-router-dom';
import style from './Logo.module.css';
import {ReactComponent as LogoIcon} from './img/logo.svg';

export const Logo = () => (
  <Link to={'/'} className={style.link}>
    <LogoIcon />
  </Link>
);
