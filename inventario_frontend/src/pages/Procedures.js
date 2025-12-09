import React, { useEffect, useState } from "react";
import api from "../api/client";
import { endpoints } from "../api/endpoints";
import Modal from "../components/common/Modal";

// PUBLIC_INTERFACE
export default function Procedures() {
  /** CRUD of procedures with file upload UI. */
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.inventory.procedures);
      setRows(data || []);
    } catch {
      setRows([{ id: 1, title: "Backup diario", description: "Procedimiento de respaldo", file_url: "" }]);
    }
  };

  const save = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (file) fd.append("file", file);
    await api.post(endpoints.inventory.procedures, fd, { headers: { "Content-Type": "multipart/form-data" } });
    setOpen(false);
    setForm({ title: "", description: "" }); setFile(null);
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between">
          <h4>Procedimientos</h4>
          <button className="btn btn-primary" onClick={() => setOpen(true)}>Nuevo</button>
        </div>
        <table className="table">
          <thead><tr><th>Título</th><th>Descripción</th><th>Archivo</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td className="text-sm text-muted">{r.description}</td>
                <td>{r.file_url ? <a href={r.file_url} target="_blank" rel="noreferrer">Descargar</a> : "-"}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={3} className="text-muted">Sin procedimientos</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Nuevo procedimiento" actions={
        <>
          <button className="btn" onClick={() => setOpen(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>
      }>
        <div className="mb-3">
          <label className="text-sm">Título</label>
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="text-sm">Descripción</label>
          <input className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="text-sm">Archivo</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
      </Modal>
    </>
  );
}
