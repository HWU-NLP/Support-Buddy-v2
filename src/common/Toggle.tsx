import React from 'react';
import './toggle.css';

interface SlideToggleProps {
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Toggle: React.FC<SlideToggleProps> = ({
  checked,
  onClick,
  disabled = false
}) => {
  return (
    <div
      className={`slide-toggle ${checked ? ' active' : ''} ${disabled ? ' disabled' : ''}`}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={e => {
        if (disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className="thumb"
      />
    </div>
  );
};

export default Toggle;