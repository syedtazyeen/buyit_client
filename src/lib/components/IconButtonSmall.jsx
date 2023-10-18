import React from "react";

export default function IconButton({ icon, onClick }) {
  return (
    <button
      className="icon-button-small"
      onClick={onClick}
    >
      <div className="icon-small-text">{icon}</div>
    </button>
  );
}