import React from "react";

export default function Offers({ nextTab }) {
  return (
    <div className="checkout-field-item">
      <input className="checkout-text-input" />
      <div>
      <button onClick={nextTab} className="text-button add">
        Apply offer
      </button>
      </div>
    </div>
  );
}
