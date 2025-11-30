import React from 'react';
import clsx from 'clsx';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className,
  label
}) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
    lg: 'w-14 h-8'
  };

  const thumbSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };

  const translateX = {
    sm: checked ? 'translate-x-4' : 'translate-x-0',
    md: checked ? 'translate-x-5' : 'translate-x-0',
    lg: checked ? 'translate-x-6' : 'translate-x-0'
  };

  return (
    <div className={clsx('flex items-center', className)}>
      <button
        type="button"
        className={clsx(
          'relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          sizeClasses[size],
          checked ? 'bg-blue-600' : 'bg-gray-200',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
            thumbSizes[size],
            translateX[size]
          )}
        />
      </button>
      {label && (
        <span className={clsx(
          'ml-3 text-sm font-medium',
          disabled ? 'text-gray-400' : 'text-gray-700'
        )}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;