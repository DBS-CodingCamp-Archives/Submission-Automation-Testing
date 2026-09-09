import { showLoading, hideLoading } from '../loading/slice';
import api from '../../utils/api';
import {
  addThread,
  toggleUpvoteThread,
  toggleDownvoteThread,
  neutralizeThreadVote,
} from './slice';

export function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThread(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
    }
  };
}

export function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
    }
  };
}

export function asyncNeutralizeThreadVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const thread = threads.find((t) => t.id === threadId);

    const isUpvoted = thread.upVotesBy.includes(authUser.id);
    const isDownvoted = thread.downVotesBy.includes(authUser.id);

    dispatch(neutralizeThreadVote({ threadId, userId: authUser.id }));
    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      if (isUpvoted)
        dispatch(toggleUpvoteThread({ threadId, userId: authUser.id }));
      if (isDownvoted)
        dispatch(toggleDownvoteThread({ threadId, userId: authUser.id }));
    }
  };
}
