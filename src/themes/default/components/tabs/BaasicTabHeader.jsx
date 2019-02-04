import React from 'react';

const BaasicTabHeader = ({ onClick, label, render, isActive }) => {
  if (label) {
    return (
      <button
        style={{ backgroundColor: isActive ? 'gray' : 'white' }}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }

  return <React.Fragment>{render({ onClick, isActive })}</React.Fragment>;
};

export default BaasicTabHeader;
