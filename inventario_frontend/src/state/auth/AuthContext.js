import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import api from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { setAuthStore, getAuthStore } from "./authStore";

// State and reducer
const initialState = {
  user: null,
  roles: [],
  accessToken: null,
  loading: true,
  toast: null
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, loading: false, ...action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.user, roles: action.roles || [], accessToken: action.access, toast: { type: "success", message: "Bienvenido" } };
    case "LOGOUT":
      return { ...initialState, loading: false, toast: { type: "success", message: "Sesión cerrada" } };
    case "TOAST":
      return { ...state, toast: action.toast };
    default:
      return state;
  }
}

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and actions for the app. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => {
    const login = async (email, password) => {
      const { data } = await api.post(endpoints.auth.login, { email, password });
      const access = data?.access;
      const user = data?.user || null;
      const roles = user?.roles || data?.roles || [];
      setAuthStore({ accessToken: access, user, roles });
      dispatch({ type: "LOGIN_SUCCESS", user, roles, access });
      return { user, roles, access };
    };

    const register = async (payload) => {
      const { data } = await api.post(endpoints.auth.register, payload);
      return data;
    };

    const refresh = async () => {
      const { data } = await api.post(endpoints.auth.refresh);
      const access = data?.access;
      if (access) {
        const current = getAuthStore();
        setAuthStore({ ...current, accessToken: access });
        dispatch({ type: "LOGIN_SUCCESS", user: current?.user, roles: current?.roles, access });
      }
      return { access };
    };

    const me = async () => {
      const { data } = await api.get(endpoints.auth.me);
      const roles = data?.roles || [];
      setAuthStore({ ...getAuthStore(), user: data, roles });
      dispatch({ type: "INIT", payload: { user: data, roles, accessToken: getAuthStore()?.accessToken } });
      return data;
    };

    const logout = async () => {
      // Optional: call backend logout endpoint if exists
      setAuthStore({ accessToken: null, user: null, roles: [] });
      dispatch({ type: "LOGOUT" });
    };

    const setToast = (toast) => dispatch({ type: "TOAST", toast });

    return { login, register, refresh, me, logout, setToast };
  }, []);

  useEffect(() => {
    // Restore on load if possible (access in memory only; user via /me)
    (async () => {
      try {
        await actions.me();
      } catch {
        dispatch({ type: "INIT", payload: {} });
      }
    })();
    // Expose store to api client refresh flow
    setAuthStore({
      ...getAuthStore(),
      refresh: actions.refresh,
      logout: actions.logout
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth state and actions. */
  return useContext(AuthContext);
}
