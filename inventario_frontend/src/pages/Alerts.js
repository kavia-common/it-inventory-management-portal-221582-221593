import React, { useEffect, useState } from "react";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function Alerts() {
  /** Alerts list with acknowledge and mute actions. */
  const [rows, setRows] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.inventory.alerts);
      setRows(data || []);
    } catch {
      setRows([{ id: 1, message: "Stock bajo en APs", muted: false }]);
    }
  };

  const acknowledge = async (row) => {
    try {
      await api.post(`${endpoints.inventory.alerts}${row.id}/ack/`);
      load();
    } catch { /* noop */ }
  };

  const mute = async (row) => {
    try {
      await api.post(`${endpoints.inventory.alerts}${row.id}/mute/`);
      load();
    } catch { /* noop */ }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card">
      <table className="table">
        <thead><tr><th>Alerta</th><th></th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.message}</td>
              <td className="flex items-center gap-2">
                <button className="btn btn-success" onClick={() => acknowledge(r)}>Reconocer</button>
                <button className="btn" onClick={() => mute(r)}>{r.muted ? "Reactivar" : "Silenciar"}</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td className="text-muted">Sin alertas</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
