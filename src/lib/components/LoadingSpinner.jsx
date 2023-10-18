import React from 'react';
import '../styles/LoadingSpinner.css'; // You can style the spinner in this CSS file

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
