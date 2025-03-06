'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  href,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center rounded-md font-medium transition-all overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-[#00452E] text-white hover:bg-[#0A6344] shadow-sm',
    secondary: 'bg-[#E4CBA5] text-[#00452E] hover:bg-[#E4CBA5]/90 shadow-sm',
    outline: 'border border-[#E4CBA5]/50 hover:border-[#E4CBA5] text-[#666] hover:text-[#00452E] hover:bg-[#FAF6F1]',
    text: 'text-[#00452E] hover:text-[#0A6344] bg-transparent',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'py-2.5 px-5',
    lg: 'text-base py-3 px-7',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;
  
  const buttonVariants = {
    hover: {
      scale: disabled ? 1 : 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: disabled ? 1 : 0.98,
      transition: { duration: 0.1 },
    },
  };
  
  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <span className="relative z-10">{children}</span>
        <motion.span
          className={`absolute inset-0 ${variant === 'primary' ? 'bg-white/10' : variant === 'secondary' ? 'bg-[#00452E]/5' : 'bg-[#E4CBA5]/10'}`}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: '100%', transformOrigin: 'center' }}
        />
      </motion.a>
    );
  }
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && (
        <motion.span
          className={`absolute inset-0 ${
            variant === 'primary' 
              ? 'bg-white/10' 
              : variant === 'secondary' 
                ? 'bg-[#00452E]/5' 
                : variant === 'outline'
                  ? 'bg-[#E4CBA5]/10'
                  : 'bg-[#00452E]/5'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ borderRadius: '100%', transformOrigin: 'center' }}
        />
      )}
    </motion.button>
  );
};

export default Button; 