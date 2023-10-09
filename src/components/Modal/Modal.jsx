import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {ReactComponent as CloseIcon} from './img/close.svg';
import {useEffect, useRef} from 'react';
import {usePhoto} from '../../hooks/usePhoto';
import formatDate from '../../utils/formatDate';
import {useNavigate, useParams} from 'react-router-dom';
import
{TailSpinLoader}
  from '../../UI/TailSpinLoader/TailSpinLoader';
import {Like} from './Like/Like';

export const Modal = () => {
  const {id, page} = useParams();
  const overlayRef = useRef(null);
  const [photo, status] = usePhoto(id);
  const navigate = useNavigate();

  const handleClick = (e) => {
    const target = e.target;
    const code = e.code;
    if (target === overlayRef.current || code === 'Escape') {
      navigate(`/${page === 'photos' ? '' : page}`);
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
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modal}>
        <>
          {status === 'rejected' && <p>Произошла ошибка</p>}
          {status === 'pending' && <TailSpinLoader />}
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
                <Like like={photo.liked_by_user} id={photo.id}/>
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
        </>
      </div>
      <CloseIcon className={style.close} onClick={() => navigate(`/${page}`)} />
    </div>,
    document.getElementById('modal-root')
  );
};
