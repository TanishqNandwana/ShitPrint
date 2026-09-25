import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'neon' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'right',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-3 py-2 space-x-1.5",
    md: "text-xs md:text-sm px-5 py-3 space-x-2",
    lg: "text-sm md:text-base px-7 py-4 space-x-3",
  };

  const variantStyles = {
    primary: "bg-editorial text-canvas hover:bg-neon hover:text-editorial border border-editorial active:scale-[0.98]",
    secondary: "bg-canvas text-editorial border border-editorial hover:bg-editorial hover:text-canvas active:scale-[0.98]",
    outline: "bg-transparent text-editorial border border-editorial/30 hover:border-editorial hover:bg-editorial/5 active:scale-[0.98]",
    neon: "bg-neon text-editorial border border-neon hover:bg-editorial hover:text-neon active:scale-[0.98]",
    ghost: "bg-transparent text-editorial hover:bg-editorial/10 active:scale-[0.98]",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />}
    </motion.button>
  );
}
