import React from "react";

const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors";
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5",
    default: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
    icon: "p-2",
  };
  const variantClasses = {
    default: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    link: "bg-transparent text-blue-500 hover:underline p-0 h-auto",
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;