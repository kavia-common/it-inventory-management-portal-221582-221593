import React, { useEffect, useState } from "react";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function Cabinets() {
  /** Cabinets view with inline edit for status and location. */
  const [rows, setRows] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.inventory.cabinets);
      setRows(data || []);
    } catch {
      setRows([{ id: 1, name: "Armario 1", status: "operativo", location: "Sala A" }]);
    }
  };

  const updateRow = async (row) => {
    // placeholder PUT/PATCH if backend supports
    setRows((prev) => prev.map(r => (r.id === row.id ? row : r)));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr><th>Armario</th><th>Estado</th><th>Ubicación</th><th></th></tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>
                <select className="select" value={r.status} onChange={(e) => setRows(rows.map(x => x.id === r.id ? { ...x, status: e.target.value } : x))}>
                  <option value="operativo">Operativo</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </td>
              <td>
                <input className="input" value={r.location || ""} onChange={(e) => setRows(rows.map(x => x.id === r.id ? { ...x, location: e.target.value } : x))} />
              </td>
              <td>
                <button className="btn btn-primary" onClick={() => updateRow(r)}>Guardar</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={4} className="text-muted">Sin datos</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
