import { describe, it, expect } from 'vitest';
import usersReducer, { setUsers } from './slice';

/**
 * Skenario Pengujian:
 *
 * - usersReducer
 *  - harus mengembalikan state awal saat diinisialisasi
 *  - harus mengembalikan daftar users saat diberikan aksi setUsers
 */

describe('usersReducer', () => {
  it('should return initial state when given undefined state', () => {
    const initialState = usersReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual([]);
  });

  it('should return users when given setUsers action', () => {
    const initialState = [];
    const newUsers = [
      { id: 'user-1', name: 'John Doe' },
      { id: 'user-2', name: 'Jane Doe' },
    ];

    const nextState = usersReducer(initialState, setUsers(newUsers));

    expect(nextState).toEqual(newUsers);
  });
});
