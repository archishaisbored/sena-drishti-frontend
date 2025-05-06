
import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="tsrs-button w-full h-[80px] flex justify-center items-center animate-pulse-glow"
    >
      {label}
    </button>
  );
};

export default ActionButton;
