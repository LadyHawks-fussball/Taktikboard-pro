export function Badge({ children, className = "", variant = "default" }) {
  const styles = {
    default: "bg-gray-200",
    secondary: "bg-blue-100 text-blue-800",
    outline: "border",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}