import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../state/auth/AuthContext";

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top header with page title and session actions. */
  const location = useLocation();
  const { state, actions } = useAuth();

  const titleMap = {
    "/dashboard": "Dashboard",
    "/inventory": "Inventario",
    "/islands": "Islas",
    "/homematerials": "Material en Casa",
    "/cabinets": "Armarios",
    "/movements": "Movimientos",
    "/procedures": "Procedimientos",
    "/alerts": "Alertas",
    "/metrics": "Métricas",
    "/admin/users": "Administración de Usuarios",
    "/quick-contacts": "Contactos Rápidos",
    "/login": "Acceder",
    "/register": "Registro"
  };
  const title = titleMap[location.pathname] || "Inventario IT";

  return (
    <header className="app-header">
      <div className="flex items-center gap-3">
        <span className="font-semibold" style={{ fontSize: 16 }}>{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {state?.user ? (
          <>
            <span className="text-sm text-muted">{state.user?.email}</span>
            <button className="btn btn-ghost" onClick={actions.logout}>Salir</button>
          </>
        ) : (
          <>
            <Link className="btn btn-ghost" to="/login">Acceder</Link>
            <Link className="btn btn-primary" to="/register">Registro</Link>
          </>
        )}
      </div>
    </header>
  );
}
