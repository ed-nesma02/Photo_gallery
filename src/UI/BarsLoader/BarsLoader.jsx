import {Bars} from 'react-loader-spinner';
import style from './BarsLoader.module.css';

export const BarsLoader = () => (
  <Bars
    visible={true}
    height="80"
    width="80"
    color="#000"
    ariaLabel="bars-loading"
    wrapperClass={style.loader}
  />
);
