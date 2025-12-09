import React from "react";

// PUBLIC_INTERFACE
export default function KpiCard({ label, value, hint }) {
  /** KPI card showing a numeric value and label. */
  return (
    <div className="card kpi">
      <div>
        <div className="value">{value}</div>
        <div className="label">{label}</div>
      </div>
      {hint && <div className="text-sm text-muted">{hint}</div>}
    </div>
  );
}
