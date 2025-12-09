import React, { useEffect, useState } from "react";
import { useInventory } from "../state/inventory/InventoryContext";
import DataTable from "../components/common/DataTable";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function Inventory() {
  /** Inventory list with search, status filter, sorting, pagination and CSV import/export. */
  const { state, actions } = useInventory();
  const [q, setQ] = useState(state.filters.q);
  const [status, setStatus] = useState(state.filters.status);

  const load = async (page = 1) => {
    const params = { q, status: status === "all" ? undefined : status, page, page_size: state.pagination.pageSize };
    await actions.list(params);
  };

  useEffect(() => { load(1); /* eslint-disable-next-line */ }, []);

  const onSearch = () => {
    actions.setFilters({ q, status });
    load(1);
  };

  const importCsv = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const form = new FormData();
    form.append("file", f);
    await api.post(endpoints.inventory.importCsv, form, { headers: { "Content-Type": "multipart/form-data" } });
    load(1);
  };

  const exportCsv = async () => {
    const { data } = await api.get(endpoints.inventory.exportCsv, { responseType: "blob" });
    const url = window.URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url; a.download = "inventario.csv"; a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns = [
    { key: "name", title: "Nombre", sortable: true },
    { key: "category", title: "Categoría", sortable: true },
    { key: "status", title: "Estado", sortable: true },
    { key: "location", title: "Ubicación", sortable: true },
  ];

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="card">
        <div className="flex items-center gap-2">
          <input className="input" placeholder="Buscar..." value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Todos</option>
            <option value="in_use">En uso</option>
            <option value="in_stock">En stock</option>
            <option value="in_repair">En reparación</option>
          </select>
          <button className="btn btn-primary" onClick={onSearch}>Filtrar</button>
          <label className="btn">
            Importar CSV
            <input onChange={importCsv} type="file" accept=".csv" style={{ display: "none" }} />
          </label>
          <button className="btn" onClick={exportCsv}>Exportar CSV</button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={state.items}
        page={state.pagination.page}
        pageSize={state.pagination.pageSize}
        total={state.pagination.total}
        onPageChange={(p) => load(p)}
      />
    </div>
  );
}
