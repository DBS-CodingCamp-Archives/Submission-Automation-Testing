import { describe, it, expect } from 'vitest';
import authUserReducer, { setAuthUser, unsetAuthUser } from './slice';

/**
 * Skenario Pengujian:
 *
 * - authUserReducer
 *  - harus mengembalikan state awal saat diinisialisasi
 *  - harus mengembalikan objek user saat diberikan aksi setAuthUser
 *  - harus mengembalikan null saat diberikan aksi unsetAuthUser
 */

describe('authUserReducer', () => {
  it('should return initial state when given undefined state', () => {
    const initialState = authUserReducer(undefined, { type: 'unknown' });
    expect(initialState).toEqual(null);
  });

  it('should return user object when given setAuthUser action', () => {
    const initialState = null;
    const user = { id: 1, name: 'Test User' };
    const nextState = authUserReducer(initialState, setAuthUser(user));
    expect(nextState).toEqual(user);
  });

  it('should return null when given unsetAuthUser action', () => {
    const initialState = { id: 1, name: 'Test User' };
    const nextState = authUserReducer(initialState, unsetAuthUser());
    expect(nextState).toEqual(null);
  });
});
