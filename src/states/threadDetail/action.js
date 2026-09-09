import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/slice';
import {
  addComment,
  clearThreadDetail,
  neutralizeCommentVote,
  neutralizeThreadDetailVote,
  setThreadDetail,
  toggleDownvoteComment,
  toggleDownvoteThreadDetail,
  toggleUpvoteComment,
  toggleUpvoteThreadDetail,
} from './slice';

export function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetail());
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(setThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addComment(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncToggleUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpvoteThreadDetail({ userId: authUser.id }));
    try {
      await api.upvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteThreadDetail({ userId: authUser.id }));
    }
  };
}

export function asyncToggleDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownvoteThreadDetail({ userId: authUser.id }));
    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteThreadDetail({ userId: authUser.id }));
    }
  };
}

export function asyncNeutralizeThreadDetailVote() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const isUpvoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownvoted = threadDetail.downVotesBy.includes(authUser.id);
    dispatch(neutralizeThreadDetailVote({ userId: authUser.id }));
    try {
      await api.neutralizeThreadVote(threadDetail.id);
    } catch (error) {
      alert(error.message);
      if (isUpvoted)
        dispatch(toggleUpvoteThreadDetail({ userId: authUser.id }));
      if (isDownvoted)
        dispatch(toggleDownvoteThreadDetail({ userId: authUser.id }));
    }
  };
}

export function asyncToggleUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));
    try {
      await api.upvoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));
    }
  };
}

export function asyncToggleDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));
    try {
      await api.downvoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));
    }
  };
}

export function asyncNeutralizeCommentVote(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find((c) => c.id === commentId);
    const isUpvoted = comment.upVotesBy.includes(authUser.id);
    const isDownvoted = comment.downVotesBy.includes(authUser.id);
    dispatch(neutralizeCommentVote({ commentId, userId: authUser.id }));
    try {
      await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      if (isUpvoted)
        dispatch(toggleUpvoteComment({ commentId, userId: authUser.id }));
      if (isDownvoted)
        dispatch(toggleDownvoteComment({ commentId, userId: authUser.id }));
    }
  };
}
