import jwt_decode from 'jwt-decode';
const setToken = (token) => {
  localStorage.setItem('ACCESS_TOKEN', token);
};

const getToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

const removeToken = () => {
  localStorage.clear();
};

const getRole = () => {
  if (getToken()) {
    const payload = jwt_decode(getToken());
    return payload.role === 'user' ? 'USER' : 'ADMIN';
  }

  return 'GUEST';
};

export default {
  setToken,
  getToken,
  removeToken,
  getRole,
};
