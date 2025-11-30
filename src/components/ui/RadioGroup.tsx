import React from 'react';
import clsx from 'clsx';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  size = 'md',
  direction = 'vertical',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  };

  return (
    <div className={clsx(
      'space-y-2',
      direction === 'horizontal' && 'flex space-x-4 space-y-0',
      className
    )}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <div className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={option.disabled}
              className="sr-only"
            />
            <div
              className={clsx(
                'border-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center',
                sizeClasses[size],
                value === option.value
                  ? 'bg-blue-50 border-blue-600'
                  : 'bg-white border-gray-300',
                option.disabled && 'opacity-50 cursor-not-allowed',
                'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2'
              )}
              onClick={() => !option.disabled && onChange(option.value)}
            >
              {value === option.value && (
                <div className={clsx(
                  'bg-blue-600 rounded-full',
                  dotSizes[size]
                )} />
              )}
            </div>
          </div>
          <span className={clsx(
            'ml-3 text-sm font-medium cursor-pointer',
            option.disabled ? 'text-gray-400' : 'text-gray-700'
          )}>
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;