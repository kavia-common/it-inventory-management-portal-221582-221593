import React, { createContext, useContext, useMemo, useReducer } from "react";
import api from "../../api/client";
import { endpoints } from "../../api/endpoints";

const initialState = {
  items: [],
  filters: { q: "", status: "all" },
  pagination: { page: 1, pageSize: 10, total: 0 },
  loading: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_LIST":
      return { ...state, items: action.items, pagination: action.pagination || state.pagination };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.filters } };
    default:
      return state;
  }
}

const InventoryContext = createContext(null);

// PUBLIC_INTERFACE
export function InventoryProvider({ children }) {
  /** Provides inventory state for pages needing shared data/filters. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => {
    const list = async (params = {}) => {
      dispatch({ type: "SET_LOADING", loading: true });
      try {
        const { data } = await api.get(endpoints.inventory.list, { params });
        const items = data?.results || data?.items || data || [];
        const pagination = {
          page: data?.page || params.page || 1,
          pageSize: data?.page_size || params.page_size || 10,
          total: data?.count || items.length
        };
        dispatch({ type: "SET_LIST", items, pagination });
        return { items, pagination };
      } finally {
        dispatch({ type: "SET_LOADING", loading: false });
      }
    };

    const setFilters = (filters) => dispatch({ type: "SET_FILTERS", filters });

    return { list, setFilters };
  }, []);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

// PUBLIC_INTERFACE
export function useInventory() {
  /** Access inventory state and actions. */
  return useContext(InventoryContext);
}
