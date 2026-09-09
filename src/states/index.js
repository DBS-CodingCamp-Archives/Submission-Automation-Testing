import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/slice';
import isPreloadReducer from './isPreload/slice';
import usersReducer from './users/slice';
import threadsReducer from './threads/slice';
import threadDetailReducer from './threadDetail/slice';
import leaderboardsReducer from './leaderboards/slice';
import loadingReducer from './loading/slice';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loading: loadingReducer,
  },
});

export default store;
