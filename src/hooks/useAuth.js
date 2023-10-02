import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authRequestAsync} from '../store/auth/authSlice';
import {setToken} from '../api/token';

export const useAuth = () => {
  const token = useSelector((state) => state.token.token);
  const status = useSelector((state) => state.auth.status);
  const auth = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  const unAuth = () => {
    setToken('');
    location.href = '/';
  };

  useEffect(() => {
    if (token) {
      dispatch(authRequestAsync());
    }
  }, [token]);

  return [auth, status, unAuth];
};
