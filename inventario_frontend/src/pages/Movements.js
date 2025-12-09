import React, { useEffect, useState } from "react";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function Movements() {
  /** Create and approve inventory movement entries. */
  const [items, setItems] = useState([]);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ item_id: "", action: "assign", note: "" });

  const load = async () => {
    try {
      const [iRes, mRes] = await Promise.all([
        api.get(endpoints.inventory.list),
        api.get(endpoints.inventory.movements)
      ]);
      setItems(iRes.data?.results || iRes.data || []);
      setList(mRes.data || []);
    } catch {
      setItems([{ id: 1, name: "Laptop #101" }]);
      setList([{ id: 1, item: "Laptop #101", action: "assign", status: "pending" }]);
    }
  };

  const create = async () => {
    try {
      await api.post(endpoints.inventory.movements, form);
      setForm({ item_id: "", action: "assign", note: "" });
      load();
    } catch {
      // noop
    }
  };

  const approve = async (row) => {
    try {
      await api.post(`${endpoints.inventory.movements}${row.id}/approve/`);
      load();
    } catch {
      // noop
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="grid grid-2">
      <div className="card">
        <h4>Nuevo movimiento</h4>
        <div className="mb-3">
          <label className="text-sm">Item</label>
          <select className="select" value={form.item_id} onChange={(e) => setForm({ ...form, item_id: e.target.value })}>
            <option value="">Seleccione item</option>
            {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="text-sm">Acción</label>
          <select className="select" value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })}>
            <option value="assign">Asignar</option>
            <option value="return">Devolver</option>
            <option value="repair">Enviar a reparación</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="text-sm">Nota</label>
          <input className="input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        </div>
        <button className="btn btn-primary" onClick={create}>Crear</button>
      </div>

      <div className="card">
        <h4>Movimientos</h4>
        <table className="table">
          <thead><tr><th>Item</th><th>Acción</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {list.map(m => (
              <tr key={m.id}>
                <td>{m.item || m.item_name}</td>
                <td>{m.action}</td>
                <td>{m.status}</td>
                <td>
                  {m.status === "pending" && <button className="btn btn-success" onClick={() => approve(m)}>Aprobar</button>}
                </td>
              </tr>
            ))}
            {list.length === 0 && <tr><td colSpan={4} className="text-muted">Sin registros</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
