import React, { useEffect } from "react";
import { useAuth } from "../../state/auth/AuthContext";

// PUBLIC_INTERFACE
export default function Toast() {
  /** Global toast reading from auth context for demo; can be extended. */
  const { state, actions } = useAuth();
  const toast = state.toast;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => actions.setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast, actions]);

  if (!toast) return null;
  return (
    <div className={`toast ${toast.type || ""}`}>
      <div>{toast.message}</div>
    </div>
  );
}
