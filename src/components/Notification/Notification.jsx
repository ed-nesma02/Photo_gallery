import {urlAuth} from '../../api/auth';
import style from './Notification.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {ReactComponent as CloseIcon} from './img/close.svg';

export const Notification = ({close}) =>
  ReactDOM.createPortal(
    <div className={style.overlay} onClick={() => close(false)}>
      <>
        <div className={style.modal}>
          <p className={style.title}>Вход в учетную запись</p>
          <a className={style.login} href={urlAuth}>
            Войти
          </a>
        </div>
        <CloseIcon
          className={style.close}
          onClick={() => {
            close(false);
          }}
        />
      </>
    </div>,
    document.getElementById('notification')
  );

Notification.propTypes = {
  close: PropTypes.func,
};
