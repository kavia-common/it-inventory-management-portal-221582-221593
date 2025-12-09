import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function Islands() {
  /** Shows items grouped by islands. */
  const [rows, setRows] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.inventory.islands);
      setRows(data || []);
    } catch {
      setRows([{ id: 1, name: "Isla A", items: 10, location: "Planta 1" }]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <DataTable
      columns={[
        { key: "name", title: "Isla" },
        { key: "items", title: "Nº items" },
        { key: "location", title: "Ubicación" }
      ]}
      data={rows}
      total={rows.length}
      pageSize={rows.length || 10}
      page={1}
    />
  );
}
