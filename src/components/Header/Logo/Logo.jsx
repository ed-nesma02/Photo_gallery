import style from './Logo.module.css';
import {ReactComponent as LogoIcon} from './img/logo.svg';

export const Logo = () => (
  <a href='/' className={style.link}>
    <LogoIcon/>
  </a>
);
