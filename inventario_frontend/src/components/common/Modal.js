import React from "react";

// PUBLIC_INTERFACE
export default function Modal({ title, open, onClose, children, actions }) {
  /** Simple modal with header, body and actions. */
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <strong>{title}</strong>
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
        <div>{children}</div>
        <div className="modal-actions">
          {actions}
        </div>
      </div>
    </div>
  );
}
