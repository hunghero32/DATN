// src/components/ui/Button.jsx
import React from "react";

export const Button = ({ children, variant = "default", className, ...props }) => {
  const baseStyles = "px-4 py-2 text-sm font-medium rounded-md";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
