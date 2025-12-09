import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../state/auth/AuthContext";

const LinkItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "nav-link" + (isActive ? " active" : "")
    }
  >
    {label}
  </NavLink>
);

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Fixed sidebar with main navigation groups. */
  const { state } = useAuth();
  const isAdmin = state?.roles?.includes("admin");
  const isManager = state?.roles?.includes("manager");
  const canWrite = isAdmin || isManager || state?.roles?.includes("technician");

  return (
    <aside className="app-sidebar">
      <div className="nav-group">
        <div className="nav-title">General</div>
        <LinkItem to="/dashboard" label="Dashboard" />
        <LinkItem to="/inventory" label="Inventario" />
        <LinkItem to="/islands" label="Islas" />
        <LinkItem to="/homematerials" label="Material en casa" />
        <LinkItem to="/cabinets" label="Armarios" />
      </div>
      <div className="nav-group">
        <div className="nav-title">Operaciones</div>
        {canWrite && <LinkItem to="/movements" label="Movimientos" />}
        {isManager && <LinkItem to="/procedures" label="Procedimientos" />}
        <LinkItem to="/alerts" label="Alertas" />
        {isManager && <LinkItem to="/metrics" label="Métricas" />}
      </div>
      <div className="nav-group">
        <div className="nav-title">Administración</div>
        {isAdmin && <LinkItem to="/admin/users" label="Usuarios" />}
        <LinkItem to="/quick-contacts" label="Contactos Rápidos" />
      </div>
    </aside>
  );
}
