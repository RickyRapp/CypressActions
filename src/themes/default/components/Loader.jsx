import React from 'react';

function Loader() {
  return (
    <div className="loader--overlay">
      <div className="center">
        <div className="lds-ring">
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

export default Loader;
