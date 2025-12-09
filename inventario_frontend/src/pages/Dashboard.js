import React, { useEffect, useState } from "react";
import api from "../api/client";
import { endpoints } from "../api/endpoints";
import KpiCard from "../components/common/KpiCard";

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard with KPIs, recent movements and active alerts (polling 15s). */
  const [kpis, setKpis] = useState({ total: 0, inUse: 0, inStock: 0, inRepair: 0 });
  const [movements, setMovements] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get(endpoints.inventory.metrics);
      setKpis({
        total: data?.total_items ?? 0,
        inUse: data?.in_use ?? 0,
        inStock: data?.in_stock ?? 0,
        inRepair: data?.in_repair ?? 0
      });
      setMovements(data?.recent_movements || []);
      setAlerts(data?.active_alerts || []);
    } catch {
      // fallback demo data
      setKpis({ total: 120, inUse: 60, inStock: 50, inRepair: 10 });
      setMovements([{ id: 1, item: "Laptop #101", action: "Asignado", when: "hoy" }]);
      setAlerts([{ id: 1, message: "Stock bajo: switches", severity: "medium" }]);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-4">
      <KpiCard label="Total" value={kpis.total} />
      <KpiCard label="En uso" value={kpis.inUse} />
      <KpiCard label="En stock" value={kpis.inStock} />
      <KpiCard label="En reparación" value={kpis.inRepair} />

      <div className="card" style={{ gridColumn: "1/-1" }}>
        <h4>Movimientos recientes</h4>
        <ul>
          {movements.map(m => (
            <li key={m.id} className="text-sm text-muted">{m.when || ""} · {m.action} · {m.item}</li>
          ))}
          {movements.length === 0 && <li className="text-sm text-muted">Sin movimientos</li>}
        </ul>
      </div>

      <div className="card" style={{ gridColumn: "1/-1" }}>
        <h4>Alertas activas</h4>
        <ul>
          {alerts.map(a => (
            <li key={a.id} className="text-sm" style={{ color: "var(--error)" }}>{a.message}</li>
          ))}
          {alerts.length === 0 && <li className="text-sm text-muted">Sin alertas</li>}
        </ul>
      </div>
    </div>
  );
}
