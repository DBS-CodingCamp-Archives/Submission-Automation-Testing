import { describe, expect, it } from 'vitest';
import threadsReducer, { addThread, toggleUpvoteThread } from './slice';

/**
 * Skenario Pengujian:
 *
 * - threadsReducer
 *  - harus mengembalikan state awal saat diinisialisasi
 *  - harus menambahkan thread baru saat aksi addThread dijalankan
 *  - harus menambahkan userId ke upVotesBy jika belum upvote
 */

describe('threadsReducer', () => {
  it('should return initial state when given undefined state', () => {
    const initialState = threadsReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual([]);
  });

  it('should handle addThread correctly', () => {
    const initialState = [{ id: 'thread-1', title: 'First thread' }];
    const newThread = { id: 'thread-2', title: 'Second thread' };
    const nextState = threadsReducer(initialState, addThread(newThread));

    expect(nextState).toEqual([
      newThread,
      { id: 'thread-1', title: 'First thread' },
    ]);
  });

  it('should handle toggleUpvoteThread correctly when not yet upvoted', () => {
    const initialState = [
      { id: 'thread-1', title: 'First thread', upVotesBy: [], downVotesBy: [] },
    ];

    const nextState = threadsReducer(
      initialState,
      toggleUpvoteThread({ threadId: 'thread-1', userId: 'user-1' }),
    );

    expect(nextState[0].upVotesBy).toContain('user-1');
  });
});
