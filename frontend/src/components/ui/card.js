// src/components/ui/Card.jsx
import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`border rounded-lg shadow-md p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};
