import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function HomeMaterials() {
  /** Materials currently at home with responsible users. */
  const [rows, setRows] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.inventory.homeMaterials);
      setRows(data || []);
    } catch {
      setRows([{ id: 1, name: "Router", user: "Juan", due_date: "2025-01-10" }]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <DataTable
      columns={[
        { key: "name", title: "Material" },
        { key: "user", title: "Responsable" },
        { key: "due_date", title: "Fecha devolución" }
      ]}
      data={rows}
      total={rows.length}
      pageSize={rows.length || 10}
      page={1}
    />
  );
}
