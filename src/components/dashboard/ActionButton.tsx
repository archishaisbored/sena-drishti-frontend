
import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="tsrs-button w-full h-[80px] flex justify-center items-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,207,201,0.5)]"
    >
      {label}
    </button>
  );
};

export default ActionButton;
