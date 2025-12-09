import axios from "axios";
import { getAuthStore } from "../state/auth/authStore";

// PUBLIC_INTERFACE
export function createApiClient() {
  /** Create an axios client configured with baseURL and interceptors. */
  const baseURL = process.env.REACT_APP_API_BASE || "http://localhost:3001/api";
  const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });

  // Attach access token on each request from in-memory store
  api.interceptors.request.use((config) => {
    const store = getAuthStore();
    if (store?.accessToken) {
      config.headers.Authorization = `Bearer ${store.accessToken}`;
    }
    return config;
  });

  let isRefreshing = false;
  let queue = [];

  const processQueue = (error, token = null) => {
    queue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
    queue = [];
  };

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config || {};
      const status = error?.response?.status;

      // Global 403 handling: surface a friendly error
      if (status === 403) {
        console.warn("Forbidden: Missing permissions for this action.");
      }

      // Attempt refresh once for 401 responses
      if (status === 401 && !original._retry) {
        original._retry = true;
        const store = getAuthStore();

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            queue.push({ resolve, reject });
          }).then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          });
        }

        isRefreshing = true;
        try {
          const newTokens = await store?.refresh?.();
          processQueue(null, newTokens?.access);
          original.headers.Authorization = `Bearer ${newTokens?.access}`;
          return api(original);
        } catch (err) {
          processQueue(err, null);
          await store?.logout?.();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

const api = createApiClient();
export default api;
