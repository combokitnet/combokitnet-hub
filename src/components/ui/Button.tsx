import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'gradient' | 'neon' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-colors duration-200 focus:outline-none overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-700 before:via-purple-700 before:to-indigo-700 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
    secondary: 'backdrop-blur-xl bg-white/20 border-2 border-white/30 text-gray-700 shadow-xl hover:shadow-2xl hover:bg-white/30 hover:border-white/50 before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500/10 before:to-purple-500/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
    danger: 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white shadow-lg hover:shadow-2xl hover:shadow-red-500/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-600 before:via-rose-600 before:to-pink-600 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
    outline: 'border-2 border-transparent bg-gradient-to-r from-violet-500 to-indigo-500 p-[2px] group-hover:shadow-lg group-hover:shadow-violet-500/25 before:absolute before:inset-0 before:bg-gradient-to-r before:from-violet-500 before:to-indigo-500 before:rounded-2xl before:opacity-10 before:transition-opacity before:duration-300 hover:before:opacity-20',
    gradient: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 animate-gradient-x bg-[length:400%_400%] before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500 before:via-blue-600 before:to-purple-700 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
    neon: 'bg-gray-900/90 backdrop-blur-md border-2 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:text-white hover:bg-cyan-400/10 transition-all duration-300',
    glass: 'backdrop-blur-2xl bg-gradient-to-br from-white/30 to-white/10 border border-white/20 text-gray-700 shadow-2xl hover:shadow-3xl hover:from-white/40 hover:to-white/20 hover:border-white/30'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-sm min-h-[24px]',
    md: 'px-2.5 py-1 text-base min-h-[28px]',
    lg: 'px-3 py-1.5 text-lg min-h-[32px]'
  };

  const outlineInnerClasses = variant === 'outline' 
    ? 'flex items-center justify-center w-full h-full bg-white rounded-[14px] text-violet-600 font-semibold transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-violet-50 group-hover:to-indigo-50'
    : '';

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        {
          'opacity-60 cursor-not-allowed': disabled || loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-2xl z-20">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {variant === 'outline' ? (
        <div className={outlineInnerClasses}>
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </div>
      ) : (
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      )}
      

    </button>
  );
};

export default Button;