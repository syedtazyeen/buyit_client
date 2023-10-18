import React, { useState } from "react";

export default function PaymentMethod({ nextTab,orderdata,updateOrderData }) {
  const paymentTypes = [
    {
      name: "Credit or Debit Card",
      value: "card",
    },
    {
      name: "UPI",
      value: "upi",
    },
    {
      name: "Cash on delivery",
      value: "cod",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  function handleOptionChange(value) {
    setSelectedOption(value);
    const newData = orderdata
    // alert(orderdata)
    newData.paymentMethod = value
    updateOrderData(newData)
  }

  return (
    <>
      {paymentTypes.map((type, index) => (
        <div className={`payment-box ${type.value===selectedOption && 'payment-active'}`}>
          <input
            type="radio"
            value={type.value}
            checked={selectedOption === type.value}
            onChange={() => handleOptionChange(type.value)}
            className="black"
          />
          <label htmlFor={type.value}>{type.name}</label>
        </div>
      ))}

      <button onClick={nextTab} className="text-button add">
        Use payment method
      </button>
    </>
  );
}
