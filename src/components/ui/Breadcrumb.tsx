import React from 'react';
import clsx from 'clsx';

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className
}) => {
  return (
    <nav className={clsx('flex items-center text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            <div className="flex items-center gap-2">
              {item.icon && (
                <span className="w-4 h-4 text-gray-500">{item.icon}</span>
              )}
              
              {item.href || item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={clsx(
                    'transition-colors duration-200',
                    isLast
                      ? 'text-gray-900 font-medium cursor-default'
                      : 'text-gray-600 hover:text-gray-900 cursor-pointer'
                  )}
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={clsx(
                    isLast
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-600'
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>
            
            {!isLast && (
              <span className="mx-2 text-gray-400 select-none">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;