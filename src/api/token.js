export const setToken = ({token, createdAt, scope, tokenType}) => {
  if (token && createdAt && scope && tokenType) {
    localStorage.setItem('token', token);
    localStorage.setItem('createdAt', createdAt);
    localStorage.setItem('scope', scope);
    localStorage.setItem('tokenType', tokenType);
    return;
  }
  localStorage.setItem('token', '');
  localStorage.setItem('createdAt', '');
  localStorage.setItem('scope', '');
  localStorage.setItem('tokenType', '');
};

export const getToken = () => {
  let token = '';
  let createdAt = '';
  let scope = '';
  let tokenType = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token', token);
    createdAt = localStorage.getItem('createdAt', createdAt);
    scope = localStorage.getItem('scope', scope);
    tokenType = localStorage.getItem('tokenType', tokenType);
  }
  return {token, createdAt, scope, tokenType};
};
