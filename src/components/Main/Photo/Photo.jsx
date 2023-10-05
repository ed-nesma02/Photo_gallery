import formatDate from '../../../utils/formatDate';
import style from './Photo.module.css';
import PropTypes from 'prop-types';
import {ReactComponent as LikeIcon} from './img/like.svg';
import {useState} from 'react';
import {Modal} from '../../Modal/Modal';

export const Photo = ({photo}) => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <article className={style.wrapper} onClick={() => setOpenModal(true)}>
        <div className={style.info}>
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
            <button className={style.like} type="submit">
              <LikeIcon />
            </button>
          </div>
        </div>
        <img
          className={style.img}
          src={photo.urls.small}
          alt={photo.alt_description}
        />
      </article>
      {openModal && <Modal id={photo?.id} close={closeModal}/>}
    </>
  );
};

Photo.propTypes = {
  photo: PropTypes.object,
};
