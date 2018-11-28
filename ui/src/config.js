const API_URL = process.env.WEBPACK ? 'http://localhost:3000' : '';

export default {
  routes: {
    auth: {
      login: () => `${API_URL}/api/auth/login`,
    },
    trips: {
      get:    (user)     => `${API_URL}/api/users/${user}/trips`,
      getOne: (user, id) => `${API_URL}/api/users/${user}/trips/${id}`,
      update: (user, id) => `${API_URL}/api/users/${user}/trips/${id}`,
      delete: (user, id) => `${API_URL}/api/users/${user}/trips/${id}`,
      create: (user)     => `${API_URL}/api/users/${user}/trips`,
    },
    users: {
      get:    () => `${API_URL}/api/users`,
      getOne: id => `${API_URL}/api/users/${id}`,
      create: () => `${API_URL}/api/users`,
    },
    events: {
      get: month => `https://www.mappening.io/api/v2/events/search?month=${month}`,
      getOne: id => `https://www.mappening.io/api/v2/events/id/${id}`,
    }
  }
};
