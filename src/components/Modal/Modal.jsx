import style from './Modal.module.css';
import ReactDOM from 'react-dom';
import {ReactComponent as LikeIcon} from './img/like.svg';
import {ReactComponent as CloseIcon} from './img/close.svg';
import {useEffect, useRef} from 'react';
import {usePhoto} from '../../hooks/usePhoto';
import formatDate from '../../utils/formatDate';
import {useNavigate, useParams} from 'react-router-dom';
import {likeRequestAsync} from '../../store/like/likeSlice';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

export const Modal = () => {
  const {id, page} = useParams();
  const overlayRef = useRef(null);
  const [photo, status] = usePhoto(id);
  const navigate = useNavigate();
  const likeRef = useRef(null);
  const dispatch = useDispatch();
  const [like, setLike] = useState(photo?.liked_by_user);
  const [countLikes, setCountLikes] = useState(photo?.likes);

  const handleLike = () => {
    if (like) {
      dispatch(likeRequestAsync({like: !like, id: photo.id}));
      setLike(false);
      likeRef.current.style.color = '';
      likeRef.current.style.backgroundColor = '';
      setCountLikes(countLikes - 1);
      return;
    }
    dispatch(likeRequestAsync({like: !like, id: photo.id}));
    setLike(true);
    likeRef.current.style.color = '#fff';
    likeRef.current.style.backgroundColor = '#ff4a4a';
    setCountLikes(countLikes + 1);
  };

  const handleClick = (e) => {
    const target = e.target;
    const code = e.code;
    if (target === overlayRef.current || code === 'Escape') {
      navigate(`/${page}`);
    }
  };

  useEffect(() => {
    if (like) {
      likeRef.current.style.color = '#fff';
      likeRef.current.style.backgroundColor = '#ff4a4a';
    }

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
                <button
                  className={style.like}
                  onClick={handleLike}
                  ref={likeRef}
                >
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
                  <p className={style.vaue}>{countLikes}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <CloseIcon
          className={style.close}
          onClick={() => navigate(`/${page}`)}
        />
      </div>
    ),
    document.getElementById('modal-root')
  );
};
