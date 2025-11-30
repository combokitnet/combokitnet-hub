import React from 'react';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'neon' | 'floating';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  className, 
  children, 
  variant = 'default',
  hover = true 
}) => {
  const variants = {
    default: 'bg-white/85 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 hover:bg-white/90',
    glass: 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl hover:bg-white/20 hover:shadow-3xl hover:border-white/30',
    gradient: 'bg-gradient-to-br from-white/90 via-indigo-50/80 to-purple-50/90 backdrop-blur-xl border border-indigo-200/50 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 hover:from-white/95 hover:via-indigo-50/90 hover:to-purple-50/95',
    neon: 'bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] hover:border-cyan-400/50 text-white',
    floating: 'bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl hover:shadow-3xl'
  };

  return (
    <div
      className={clsx(
        'rounded-2xl transition-colors duration-200 relative overflow-hidden group',
        variants[variant],
        {
          'cursor-pointer': hover,
        },
        className
      )}
    >
      {/* Animated background gradient */}
      {variant === 'default' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </>
      )}
      
      {/* Glass shine effect */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {/* Neon pulse effect */}
      {variant === 'neon' && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-pulse" />
      )}
      
      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default Card;