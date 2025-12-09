import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/auth/AuthContext";

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form; delegates to backend and navigates to login. */
  const { actions } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      await actions.register(form);
      setMsg("Registro exitoso. Ahora puedes acceder.");
      setTimeout(() => navigate("/login"), 800);
    } catch (e2) {
      setMsg("No fue posible registrar. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin: "40px auto" }}>
      <h3>Registro</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="text-sm">Nombre</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="text-sm">Email</label>
          <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required />
        </div>
        <div className="mb-3">
          <label className="text-sm">Contraseña</label>
          <input className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" required />
        </div>
        {msg && <div className="text-sm">{msg}</div>}
        <div className="mt-3 flex items-center gap-2">
          <button className="btn btn-primary" disabled={submitting} type="submit">Crear cuenta</button>
          <Link to="/login" className="btn btn-ghost">Acceder</Link>
        </div>
      </form>
    </div>
  );
}
