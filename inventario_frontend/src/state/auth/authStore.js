let store = {
  accessToken: null,
  user: null,
  roles: [],
  refresh: null,
  logout: null
};

// PUBLIC_INTERFACE
export function setAuthStore(next) {
  /** Shallow merge to update in-memory auth store. */
  store = { ...store, ...next };
}

// PUBLIC_INTERFACE
export function getAuthStore() {
  /** Get current in-memory auth store. */
  return store;
}
