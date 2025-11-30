import React, { useState } from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = 'default',
  className
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const baseTabClasses = 'px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  const variantClasses = {
    default: {
      container: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent hover:text-gray-700',
      active: 'border-blue-500 text-blue-600',
      inactive: 'text-gray-500'
    },
    pills: {
      container: 'bg-gray-100 rounded-lg p-1',
      tab: 'rounded-md',
      active: 'bg-white text-gray-900 shadow-sm',
      inactive: 'text-gray-600 hover:text-gray-900'
    },
    underline: {
      container: 'space-x-8',
      tab: 'pb-4 border-b-2 border-transparent',
      active: 'border-blue-500 text-blue-600',
      inactive: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }
  };

  const currentVariant = variantClasses[variant];

  return (
    <div className={className}>
      <div className={clsx('flex', currentVariant.container)}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(
              baseTabClasses,
              currentVariant.tab,
              tab.disabled
                ? 'opacity-50 cursor-not-allowed'
                : activeTab === tab.id
                ? currentVariant.active
                : currentVariant.inactive
            )}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;