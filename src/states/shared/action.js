import { showLoading, hideLoading } from '../loading/slice';
import api from '../../utils/api';
import { setUsers } from '../users/slice';
import { setThreads } from '../threads/slice';

export function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      dispatch(setUsers(users));
      dispatch(setThreads(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
