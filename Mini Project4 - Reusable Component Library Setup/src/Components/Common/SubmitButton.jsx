import React from 'react';

const SubmitButton = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 text-white rounded-md ${disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
