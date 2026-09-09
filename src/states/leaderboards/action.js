import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/slice';
import { setLeaderboards } from './slice';

export function asyncPopulateLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(setLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
