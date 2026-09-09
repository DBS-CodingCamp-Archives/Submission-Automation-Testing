import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/slice';

export function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}
