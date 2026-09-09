const BASE_URL = import.meta.env.VITE_API_URL;

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

async function _fetchWithAuth(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

const api = {
  async putAccessToken(token) {
    putAccessToken(token);
  },

  getAccessToken() {
    return getAccessToken();
  },

  async register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  },

  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.token;
  },

  async getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.user;
  },

  async getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.users;
  },

  async getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.threads;
  },

  async getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.detailThread;
  },

  async createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.thread;
  },

  async createComment({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      },
    );

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.comment;
  },

  async upvoteThread(id) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${id}/up-vote`, {
      method: 'POST',
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async downvoteThread(id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/down-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async neutralizeThreadVote(id) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/neutral-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async upvoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async downvoteComment({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async neutralizeCommentVote({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
      },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success')
      throw new Error(responseJson.message);
    return responseJson.data.vote;
  },

  async getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }

    return responseJson.data.leaderboards;
  },
};

export default api;
