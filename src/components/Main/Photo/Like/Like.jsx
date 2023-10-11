import {useEffect, useRef, useState} from 'react';
import style from './Like.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ReactComponent as LikeIcon} from '../img/like.svg';
import {Notification} from '../../../Notification/Notification';
import {likeRequestAsync} from '../../../../store/like/likeSlice';

export const Like = ({like, id, status}) => {
  const [liked, setLiked] = useState(like);
  const likeRef = useRef(null);
  const dispatch = useDispatch();
  const statusAuth = useSelector((state) => state.auth.status);
  const [openNotification, setOpenNotification] = useState(false);

  const handleLike = () => {
    if (statusAuth === 'fulfilled') {
      if (liked) {
        dispatch(likeRequestAsync({like: !liked, id}));
        setLiked(false);
        likeRef.current.style.color = '';
        likeRef.current.style.backgroundColor = '';
        return;
      }
      dispatch(likeRequestAsync({like: !liked, id}));
      setLiked(true);
      likeRef.current.style.color = '#fff';
      likeRef.current.style.backgroundColor = '#ff4a4a';
      return;
    }
    setOpenNotification(true);
  };

  useEffect(() => {
    if (like) {
      likeRef.current.style.color = '#fff';
      likeRef.current.style.backgroundColor = '#ff4a4a';
    }
  }, [status]);

  return (
    <>
      <button
        className={style.like}
        onClick={handleLike}
        ref={likeRef}
        type="submit"
      >
        <LikeIcon />
      </button>
      {openNotification && <Notification close={setOpenNotification} />}
    </>
  );
};

Like.propTypes = {
  like: PropTypes.bool,
  id: PropTypes.string,
  status: PropTypes.string,
};