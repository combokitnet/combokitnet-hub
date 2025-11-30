import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  position?: 'left' | 'right';
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  position = 'left',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const positionClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className={clsx('relative inline-block', className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div className={clsx(
          'absolute top-full mt-1 min-w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50',
          'backdrop-blur-xl bg-white/95',
          positionClasses[position]
        )}>
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item.value)}
                disabled={item.disabled}
                className={clsx(
                  'w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors duration-150',
                  {
                    'hover:bg-gray-50 text-gray-700': !item.disabled,
                    'text-gray-400 cursor-not-allowed': item.disabled,
                  }
                )}
              >
                {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;