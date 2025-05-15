import React from "react";

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center text-xs font-medium px-2 py-1 rounded-full";
  const variantClasses = {
    default: "bg-red-500 text-white",
    outline: "bg-transparent border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;