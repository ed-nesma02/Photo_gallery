import style from './Photo.module.css';
import PropTypes from 'prop-types';

export const Photo = ({photo}) => (
  <img className={style.img} src={photo.urls.small} alt="" />
);

Photo.propTypes = {
  photo: PropTypes.object,
};
