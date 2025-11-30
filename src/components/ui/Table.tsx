import React from 'react';
import clsx from 'clsx';

interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  className,
  striped = false,
  hoverable = true,
  compact = false
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  'font-semibold text-gray-700 bg-gray-50/80',
                  compact ? 'px-3 py-2' : 'px-4 py-3',
                  alignClasses[column.align || 'left']
                )}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={clsx(
                'border-b border-gray-100 transition-colors duration-150',
                {
                  'bg-gray-50/30': striped && rowIndex % 2 === 1,
                  'hover:bg-gray-50': hoverable,
                }
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={clsx(
                    'text-gray-900',
                    compact ? 'px-3 py-2' : 'px-4 py-3',
                    alignClasses[column.align || 'left']
                  )}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
};

export default Table;