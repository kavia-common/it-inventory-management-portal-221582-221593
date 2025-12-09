import React, { useEffect, useState } from "react";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function AdminUsers() {
  /** Admin page for managing users and roles. */
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ email: "", password: "", roles: ["viewer"] });

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.admin.users);
      setRows(data || []);
    } catch {
      setRows([{ id: 1, email: "admin@example.com", roles: ["admin"] }]);
    }
  };

  const create = async () => {
    await api.post(endpoints.admin.users, form);
    setForm({ email: "", password: "", roles: ["viewer"] });
    load();
  };

  const updateRoles = async (user, roles) => {
    await api.patch(`${endpoints.admin.users}${user.id}/`, { roles });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="grid grid-2">
      <div className="card">
        <h4>Nuevo usuario</h4>
        <div className="mb-3">
          <label className="text-sm">Email</label>
          <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="text-sm">Contraseña</label>
          <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="text-sm">Roles</label>
          <select className="select" multiple value={form.roles} onChange={(e) => setForm({ ...form, roles: Array.from(e.target.selectedOptions).map(o => o.value) })}>
            <option value="admin">admin</option>
            <option value="manager">manager</option>
            <option value="viewer">viewer</option>
            <option value="technician">technician</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={create}>Crear</button>
      </div>

      <div className="card">
        <h4>Usuarios</h4>
        <table className="table">
          <thead><tr><th>Email</th><th>Roles</th></tr></thead>
          <tbody>
            {rows.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <select className="select" multiple value={u.roles || []} onChange={(e) => updateRoles(u, Array.from(e.target.selectedOptions).map(o => o.value))}>
                    <option value="admin">admin</option>
                    <option value="manager">manager</option>
                    <option value="viewer">viewer</option>
                    <option value="technician">technician</option>
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td className="text-muted">Sin usuarios</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
