import formatDate from '../../../utils/formatDate';
import style from './Photo.module.css';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {useRef} from 'react';
import {Notification} from '../../Notification/Notification';
import {Like} from './Like/Like';

export const Photo = ({photo, status}) => {
  const navigate = useNavigate();
  const photoRef = useRef(null);
  const {page} = useParams();
  const [openNotification, setOpenNotification] = useState(false);


  const handleClick = (e) => {
    const target = e.target;
    if (target === photoRef.current) {
      navigate(`/${page ?? 'photos'}/${photo.id}`);
      document.body.style.overflowY = 'hidden';
    }
  };

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
            <p className={style.likeCount}>{photo.likes}</p>
            <Like like={photo.liked_by_user} id={photo.id} status={status}/>
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
  status: PropTypes.string,
};
