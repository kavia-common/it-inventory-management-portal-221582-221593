import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function NotFound() {
  /** 404 Not Found page. */
  return (
    <div className="card" style={{ margin: "40px auto", maxWidth: 520 }}>
      <h3>Página no encontrada</h3>
      <p className="text-muted">La ruta solicitada no existe.</p>
      <Link to="/dashboard" className="btn btn-primary">Ir al Dashboard</Link>
    </div>
  );
}
