import React from 'react';
import clsx from 'clsx';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  if (variant === 'spinner') {
    return (
      <div
        className={clsx(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-500',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div className={clsx('flex space-x-1', className)}>
        <div className={clsx('bg-blue-500 rounded-full animate-bounce', sizeClasses[size])} />
        <div className={clsx('bg-blue-500 rounded-full animate-bounce delay-100', sizeClasses[size])} />
        <div className={clsx('bg-blue-500 rounded-full animate-bounce delay-200', sizeClasses[size])} />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        className={clsx(
          'bg-blue-500 rounded-full animate-pulse',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return null;
};

export default Loader;