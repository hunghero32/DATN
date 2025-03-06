export const Card = ({ children, className }) => {
    return <div className={`border p-4 rounded-lg shadow ${className}`}>{children}</div>;
  };
  
  export const CardContent = ({ children }) => {
    return <div className="p-2">{children}</div>;
  };
  