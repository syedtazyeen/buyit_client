import React from 'react'

export default function Address({nextTab, orderdata,updateOrderData}) {
  return (
    <div className='checkout-field-item'>
      
      <button 
      onClick={nextTab}
      className='text-button add'>Select address</button>
    </div>
  )
}
