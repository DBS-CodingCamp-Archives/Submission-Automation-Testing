import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncSetAuthUser, asyncUnsetAuthUser } from './slice';

/**
 * Skenario Pengujian:
 *
 * - asyncSetAuthUser thunk
 *  - harus memanggil api.login, api.putAccessToken, dan api.getOwnProfile
 *  - harus mengembalikan authUser jika berhasil
 *
 * - asyncUnsetAuthUser thunk
 *  - harus memanggil api.putAccessToken dengan string kosong
 */

vi.mock('../../utils/api');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call APIs correctly and return authUser', async () => {
    const fakeToken = 'fake-token';
    const fakeUser = { id: 1, name: 'John Doe', email: 'john@example.com' };

    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const getState = vi.fn();

    const action = asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password',
    });
    const result = await action(dispatch, getState, undefined);

    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password',
    });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(result.payload).toEqual(fakeUser);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call api.putAccessToken with empty string', async () => {
    const dispatch = vi.fn();
    const getState = vi.fn();

    const action = asyncUnsetAuthUser();
    await action(dispatch, getState, undefined);

    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
