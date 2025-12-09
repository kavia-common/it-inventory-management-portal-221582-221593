import React, { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export default function DataTable({ columns, data, page = 1, pageSize = 10, total = 0, onPageChange, onSort }) {
  /** Generic table with sortable headers and basic pagination. */
  const [sort, setSort] = useState(null);
  const pages = Math.max(1, Math.ceil((total || data.length || 0) / pageSize));

  const sorted = useMemo(() => {
    if (!sort) return data;
    const [key, dir] = sort;
    return [...data].sort((a, b) => {
      const av = a[key]; const bv = b[key];
      if (av === bv) return 0;
      return dir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });
  }, [data, sort]);

  const handleSort = (key) => {
    let next = ["asc", "desc"];
    if (!sort || sort[0] !== key) {
      setSort([key, "asc"]);
      onSort && onSort(key, "asc");
    } else {
      const dir = sort[1] === "asc" ? "desc" : "asc";
      setSort([key, dir]);
      onSort && onSort(key, dir);
    }
  };

  return (
    <div className="card">
      <div style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} onClick={() => c.sortable && handleSort(c.key)} style={{ cursor: c.sortable ? "pointer" : "default" }}>
                  {c.title} {sort && sort[0] === c.key ? (sort[1] === "asc" ? "▲" : "▼") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => (
              <tr key={row.id || idx}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.render ? c.render(row[c.key], row) : String(row[c.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr><td colSpan={columns.length} className="text-muted">Sin datos</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-muted">Total: {total}</div>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={() => onPageChange && onPageChange(Math.max(1, page - 1))} disabled={page <= 1}>Anterior</button>
          <div className="text-sm">{page} / {pages}</div>
          <button className="btn" onClick={() => onPageChange && onPageChange(Math.min(pages, page + 1))} disabled={page >= pages}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}
