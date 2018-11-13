const API_URL = process.env.WEBPACK ? 'http://localhost:3000' : '';

export default {
  routes: {
    trips: {
      get: () => `${API_URL}/api/trips`,
      getOne: id => `${API_URL}/api/trips/${id}`,
      update: id => `${API_URL}/api/trips/${id}`,
      delete: id => `${API_URL}/api/trips/${id}`,
      create: () => `${API_URL}/api/trips`,
    }
  }
};
