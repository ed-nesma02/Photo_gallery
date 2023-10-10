import formatDate from '../../../utils/formatDate';
import style from './Photo.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as LikeIcon} from './img/like.svg';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {likeRequestAsync} from '../../../store/like/likeSlice';
import {Notification} from '../../Notification/Notification';

export const Photo = ({photo}) => {
  const navigate = useNavigate();
  const likeRef = useRef(null);
  const photoRef = useRef(null);
  const dispatch = useDispatch();
  const {page} = useParams();
  const statusAuth = useSelector((state) => state.auth.status);
  const [like, setLike] = useState(photo.liked_by_user);
  const [countLikes, setCountLikes] = useState(photo.likes);
  const [openNotification, setOpenNotification] = useState(false);

  const handleLike = () => {
    if (statusAuth === 'fulfilled') {
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
      return;
    }
    setOpenNotification(true);
  };

  const handleClick = (e) => {
    const target = e.target;
    if (target === photoRef.current) {
      navigate(`/${page ?? 'photos'}/${photo.id}`);
      document.body.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    if (like) {
      likeRef.current.style.color = '#fff';
      likeRef.current.style.backgroundColor = '#ff4a4a';
    }
  }, []);

  return (
    <>
      <article className={style.wrapper} onClick={handleClick}>
        <div className={style.info} ref={photoRef}>
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
            <p className={style.authorName}>{photo.user.name}</p>
          </a>
          <p className={style.date}>{formatDate(photo.created_at)}</p>
          <div className={style.likeInfo}>
            <p className={style.likeCount}>{countLikes}</p>
            <button
              className={style.like}
              onClick={handleLike}
              ref={likeRef}
              type="submit"
            >
              <LikeIcon />
            </button>
          </div>
        </div>
        <img
          loading="lazy"
          style={{
            'aspectRatio': `${photo.width}/${photo.height}`,
            '--path': `url(${photo.urls.thumb})`,
          }}
          className={style.img}
          src={photo.urls.regular}
          alt={photo.alt_description}
        />
      </article>
      {openNotification && <Notification close={setOpenNotification} />}
    </>
  );
};

Photo.propTypes = {
  photo: PropTypes.object,
};
