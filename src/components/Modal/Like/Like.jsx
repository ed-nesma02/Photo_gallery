import {useEffect, useRef, useState} from 'react';
import style from './Like.module.css';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {likeRequestAsync} from '../../../store/like/likeSlice';
import {ReactComponent as LikeIcon} from '../img/like.svg';

export const Like = ({like, id}) => {
  const [liked, setLiked] = useState(like);
  const likeRef = useRef(null);
  const dispatch = useDispatch();
  console.log(liked);

  const handleLike = () => {
    if (like) {
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
  };

  useEffect(() => {
    if (likeRef.current && liked) {
      likeRef.current.style.color = '#fff';
      likeRef.current.style.backgroundColor = '#ff4a4a';
    }
  }, []);

  return (
    <button
      className={style.like}
      onClick={handleLike}
      ref={likeRef}
      type="submit"
    >
      <LikeIcon />
    </button>
  );
};

Like.propTypes = {
  like: PropTypes.bool,
  id: PropTypes.string,
};
