import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../state/auth/AuthContext";

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form using auth actions.login; redirects to previous page. */
  const { actions } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await actions.login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Credenciales inválidas");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
      <h3>Acceder</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="text-sm">Email</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="mb-3">
          <label className="text-sm">Contraseña</label>
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        {error && <div className="text-sm" style={{ color: "var(--error)" }}>{error}</div>}
        <div className="mt-3 flex items-center gap-2">
          <button className="btn btn-primary" disabled={submitting} type="submit">Entrar</button>
          <Link to="/register" className="btn">Crear cuenta</Link>
        </div>
      </form>
    </div>
  );
}
