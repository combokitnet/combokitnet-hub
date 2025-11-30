import React from 'react';
import clsx from 'clsx';
import Button from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  className
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
        >
          ←←
        </Button>
      )}
      
      {/* Previous Page */}
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </Button>
      
      {/* Ellipsis before */}
      {visiblePages[0] > 1 && (
        <>
          {visiblePages[0] > 2 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}
      
      {/* Page Numbers */}
      {visiblePages.map(page => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onPageChange(page)}
          className={clsx(
            'min-w-8 px-2',
            page === currentPage && 'pointer-events-none'
          )}
        >
          {page}
        </Button>
      ))}
      
      {/* Ellipsis after */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-gray-400">...</span>
          )}
        </>
      )}
      
      {/* Next Page */}
      <Button
        variant="ghost"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </Button>
      
      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
        >
          →→
        </Button>
      )}
    </div>
  );
};

export default Pagination;