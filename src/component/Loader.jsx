import React from 'react';
import '../component/Css/loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader" >
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
