import React from 'react';
import Spinner2 from './Spinner2.gif'; // Ensure the correct path and filename

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <img src={Spinner2} alt="loading" />
    </div>
  );
};

export default Spinner;
