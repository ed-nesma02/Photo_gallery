import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {ReactComponent as CloseIcon} from './img/close.svg';
import {useEffect, useRef, useState} from 'react';
import {usePhoto} from '../../hooks/usePhoto';
import formatDate from '../../utils/formatDate';
import {useNavigate, useParams} from 'react-router-dom';
import {TailSpinLoader} from '../../UI/TailSpinLoader/TailSpinLoader';
import {Like} from './Like/Like';
import notPhoto from './img/default.jpg';

export const Modal = () => {
  const {id, page} = useParams();
  const overlayRef = useRef(null);
  const photoRef = useRef();
  const [clickPhoto, setClickPhoto] = useState(false);
  const [photo, status] = usePhoto(id);
  const navigate = useNavigate();
  const [countlLike, setCountLike] = useState(photo.likes);

  const handleClick = (e) => {
    const target = e.target;
    const code = e.code;
    if (target === overlayRef.current || code === 'Escape') {
      navigate(`/${page === 'photos' ? '' : page}`);
      document.body.style.overflowY = 'auto';
    }
  };

  const openImg = () => {
    if (!clickPhoto) {
      photoRef.current.style = `
        z-index: 20;
        position: absolute;
        top: -20px;
        width: calc(100vw - 17px);
        max-width: none;
        max-height: none;
        cursor: zoom-out;`;
      setClickPhoto(true);
      return;
    }
    photoRef.current.style = '';
    setClickPhoto(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleClick);

    () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleClick);
    };
  }, []);

  useEffect(() => {
    if (status === 'fulfilled') {
      setCountLike(photo.likes);
    }
  }, [status]);

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
                <Like
                  like={photo.liked_by_user}
                  id={photo.id}
                  count={countlLike}
                  setCount={setCountLike}
                />
              </div>
              <div className={style.main}>
                <img
                  className={style.img}
                  src={photo.urls.full}
                  alt={photo.alt_description}
                  onClick={openImg}
                  onError={() => {
                    photoRef.current.src = notPhoto;
                  }}
                  ref={photoRef}
                  style={{'--path': `url(${photo.urls.thumb})`}}
                />
              </div>
              <div className={style.bottom}>
                <div className={style.published}>
                  <p className={style.field}>Опубликовано</p>
                  <p className={style.vaue}>{formatDate(photo.created_at)}</p>
                </div>
                <div className={style.likes}>
                  <p className={style.field}>Понравилось</p>
                  <p className={style.vaue}>{countlLike}</p>
                </div>
              </div>
            </>
          )}
        </>
      </div>
      <CloseIcon
        className={style.close}
        onClick={() => {
          navigate(`/${page}`);
          photoRef.current.style = '';
          document.body.style.overflowY = 'auto';
        }}
      />
    </div>,
    document.getElementById('modal-root')
  );
};
