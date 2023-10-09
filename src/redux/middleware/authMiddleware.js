// authMiddleware.js
import { setAccessToken } from '../store/authSlide';
import { push } from 'react-router-redux';

const authMiddleware = store => next => action => {
  const accessToken = localStorage.getItem('access_token');
  const data_user = localStorage.getItem('access_token');


  if (!accessToken && !data_user) {
    // Nếu không có token trong localStorage, cập nhật trạng thái Redux về null
    store.dispatch(setAccessToken({
      access_token: null,
      data_user: null
    }));
  }

  return next(action);
};

export default authMiddleware;