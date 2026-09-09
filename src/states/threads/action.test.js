import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from '../loading/slice';
import api from '../../utils/api';
import { asyncAddThread, asyncToggleUpvoteThread } from './action';
import { addThread, toggleUpvoteThread } from './slice';

/**
 * Skenario Pengujian:
 *
 * - asyncAddThread thunk
 *  - harus mendispatch aksi secara berurutan jika API berhasil
 *  - harus menampilkan alert dan tidak mendispatch addThread jika API gagal
 *
 * - asyncToggleUpvoteThread thunk
 *  - harus mendispatch aksi optimistik dan memanggil API dengan benar
 */

vi.mock('../../utils/api');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Test',
      body: 'Testing body',
      category: 'test',
      createdAt: '2022-09-22T10:06:55.588Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = vi.fn();

    await asyncAddThread({
      title: 'Thread Test',
      body: 'Testing body',
      category: 'test',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThread(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    const fakeError = new Error('Ups, something went wrong');

    api.createThread.mockRejectedValue(fakeError);

    const dispatch = vi.fn();

    await asyncAddThread({
      title: 'Thread Test',
      body: 'Testing body',
      category: 'test',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).not.toHaveBeenCalledWith(addThread(expect.any(Object)));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});

describe('asyncToggleUpvoteThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should dispatch actions optimistically and call API', async () => {
    api.upvoteThread.mockResolvedValue({});

    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
    });

    await asyncToggleUpvoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );
    expect(api.upvoteThread).toHaveBeenCalledWith('thread-1');
  });
});
