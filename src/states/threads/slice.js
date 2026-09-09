import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setThreads(state, action) {
      return action.payload;
    },
    addThread(state, action) {
      state.unshift(action.payload);
    },
    toggleUpvoteThread(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.upVotesBy.includes(userId)) {
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        } else {
          thread.upVotesBy.push(userId);
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownvoteThread(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        if (thread.downVotesBy.includes(userId)) {
          thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        } else {
          thread.downVotesBy.push(userId);
          thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    neutralizeThreadVote(state, action) {
      const { threadId, userId } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
      }
    }
  }
});

export const { setThreads, addThread, toggleUpvoteThread, toggleDownvoteThread, neutralizeThreadVote } = threadsSlice.actions;

export default threadsSlice.reducer;
