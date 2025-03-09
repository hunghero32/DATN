// src/components/ui/card.js
export function Card({ children, className, ...props }) {
  return <div className={`bg-white p-4 shadow-md rounded-lg ${className}`} {...props}>{children}</div>;
}
