import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    setThreadDetail(state, action) {
      return action.payload;
    },
    clearThreadDetail() {
      return null;
    },
    addComment(state, action) {
      if (state) {
        state.comments.unshift(action.payload);
      }
    },
    toggleUpvoteThreadDetail(state, action) {
      const { userId } = action.payload;
      if (state) {
        if (state.upVotesBy.includes(userId)) {
          state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        } else {
          state.upVotesBy.push(userId);
          state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownvoteThreadDetail(state, action) {
      const { userId } = action.payload;
      if (state) {
        if (state.downVotesBy.includes(userId)) {
          state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
        } else {
          state.downVotesBy.push(userId);
          state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    neutralizeThreadDetailVote(state, action) {
      const { userId } = action.payload;
      if (state) {
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      }
    },
    toggleUpvoteComment(state, action) {
      const { commentId, userId } = action.payload;
      if (state) {
        const comment = state.comments.find((c) => c.id === commentId);
        if (comment) {
          if (comment.upVotesBy.includes(userId)) {
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          } else {
            comment.upVotesBy.push(userId);
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          }
        }
      }
    },
    toggleDownvoteComment(state, action) {
      const { commentId, userId } = action.payload;
      if (state) {
        const comment = state.comments.find((c) => c.id === commentId);
        if (comment) {
          if (comment.downVotesBy.includes(userId)) {
            comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          } else {
            comment.downVotesBy.push(userId);
            comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          }
        }
      }
    },
    neutralizeCommentVote(state, action) {
      const { commentId, userId } = action.payload;
      if (state) {
        const comment = state.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        }
      }
    }
  }
});

export const {
  setThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpvoteThreadDetail,
  toggleDownvoteThreadDetail,
  neutralizeThreadDetailVote,
  toggleUpvoteComment,
  toggleDownvoteComment,
  neutralizeCommentVote
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
