import style from './Modal.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {ReactComponent as LikeIcon} from './img/like.svg';
import {ReactComponent as CloseIcon} from './img/close.svg';
import {useEffect, useRef} from 'react';
import {usePhoto} from '../../hooks/usePhoto';
import formatDate from '../../utils/formatDate';

export const Modal = ({id, close}) => {
  const overlayRef = useRef(null);
  const [photo, status] = usePhoto(id);

  const handleClick = (e) => {
    const target = e.target;
    const code = e.code;
    if (target === overlayRef.current || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleClick);
    () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleClick);
    };
  }, []);

  return ReactDOM.createPortal(
    Object.keys(photo).length && (
      <div className={style.overlay} ref={overlayRef}>
        <div className={style.modal}>
          {status === 'fulfilled' && (
            <>
              <div className={style.top}>
                <a
                  target="blank"
                  href={photo.user.links.html}
                  className={style.authorLink}
                >
                  <img
                    className={style.thumbnail}
                    src={photo.user.profile_image.medium}
                    alt={photo.user.username}
                  />
                  <p className={style.name}>{photo.user.name}</p>
                  <p className={style.username}>{photo.user.username}</p>
                </a>
                <button className={style.like}>
                  <LikeIcon />
                </button>
              </div>
              <div className={style.main}>
                <img
                  className={style.img}
                  src={photo.urls.full}
                  alt={photo.alt_description}
                />
              </div>
              <div className={style.bottom}>
                <div className={style.published}>
                  <p className={style.field}>Опубликовано</p>
                  <p className={style.vaue}>{formatDate(photo.created_at)}</p>
                </div>
                <div className={style.likes}>
                  <p className={style.field}>Понравилось</p>
                  <p className={style.vaue}>{photo.likes}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <CloseIcon className={style.close} onClick={close} />
      </div>
    ),
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  close: PropTypes.func,
};
