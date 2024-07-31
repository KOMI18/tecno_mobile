import React from 'react';


const Loader = ({margin_Top}) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '3.5vh', marginTop: margin_Top }}>
      <div className="spinner-border text-white" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  );
};

export default Loader;
