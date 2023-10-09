import style from './Auth.module.css';
import {urlAuth} from '../../../api/auth';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {tokenRequestAsync} from '../../../store/token/tokenSlice';
import {useAuth} from '../../../hooks/useAuth';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {
  const dispatch = useDispatch();
  const [auth, status, unAth] = useAuth();
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token') && location.search.includes('?code=')) {
      dispatch(tokenRequestAsync());
    }
  }, []);

  const handleClick = () => {
    navigate('/liked');
    setLogout(false);
  };

  return (
    <div className={style.container}>
      {(status === 'idle' || status === 'rejected') && (
        <a className={style.login} href={urlAuth}>
          ВОЙТИ
        </a>
      )}
      {status === 'fulfilled' && (
        <>
          <a className={style.name}>{auth.name}</a>
          <img
            className={style.icon}
            src={auth.photo}
            alt={auth.name}
            onClick={() => setLogout(!logout)}
          />
        </>
      )}
      {logout && (
        <ul className={style.menu}>
          <li className={style.item}>
            <button className={style.logout} onClick={handleClick}>
              Понравившиеся
            </button>
          </li>
          <li className={style.item}>
            <button className={style.logout} onClick={unAth}>
              Выйти
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
