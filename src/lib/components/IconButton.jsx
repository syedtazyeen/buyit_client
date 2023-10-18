import React from "react";

export default function IconButton({ icon, onClick }) {
  return (
    <button
      className="icon-button"
      onClick={onClick}
    >
      <div className="icon-text">{icon}</div>
    </button>
  );
}
