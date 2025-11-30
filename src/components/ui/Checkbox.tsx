import React from 'react';
import clsx from 'clsx';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  size = 'md',
  className,
  label
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={clsx('flex items-center', className)}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={clsx(
            'border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center',
            sizeClasses[size],
            checked || indeterminate
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-gray-300',
            disabled && 'opacity-50 cursor-not-allowed',
            'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2'
          )}
          onClick={() => !disabled && onChange(!checked)}
        >
          {(checked || indeterminate) && (
            <svg
              className={clsx(iconSizes[size], 'text-white')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {indeterminate ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
          )}
        </div>
      </div>
      {label && (
        <span className={clsx(
          'ml-3 text-sm font-medium cursor-pointer',
          disabled ? 'text-gray-400' : 'text-gray-700'
        )}>
          {label}
        </span>
      )}
    </div>
  );
};

export default Checkbox;