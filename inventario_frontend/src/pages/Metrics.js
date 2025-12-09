import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../api/client";
import { endpoints } from "../api/endpoints";

// PUBLIC_INTERFACE
export default function Metrics() {
  /** Displays metrics with charts. */
  const [data, setData] = useState([]);

  const load = async () => {
    try {
      const res = await api.get(endpoints.inventory.metrics);
      const series = res.data?.series || [];
      setData(series);
    } catch {
      setData([
        { name: "Ene", stock: 50, uso: 40 },
        { name: "Feb", stock: 55, uso: 42 },
        { name: "Mar", stock: 58, uso: 43 }
      ]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="card" style={{ height: 360 }}>
      <h4>Evolución de stock y uso</h4>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="stock" stroke="#3b82f6" />
          <Line type="monotone" dataKey="uso" stroke="#06b6d4" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
