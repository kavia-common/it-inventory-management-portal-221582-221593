import React from "react";

// PUBLIC_INTERFACE
export default function QuickContacts() {
  /** Quick contact list with tel/mailto links. */
  const contacts = [
    { name: "Soporte IT", email: "soporte@example.com", phone: "+34 600 000 000" },
    { name: "Redes", email: "redes@example.com", phone: "+34 600 000 001" }
  ];

  return (
    <div className="card">
      <h4>Contactos rápidos</h4>
      <ul>
        {contacts.map((c, idx) => (
          <li key={idx} className="mb-2">
            <strong>{c.name}</strong> — <a href={`mailto:${c.email}`}>{c.email}</a> — <a href={`tel:${c.phone}`}>{c.phone}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
