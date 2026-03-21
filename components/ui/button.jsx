export function Button({ children, className = "", variant = "default", ...props }) {
  const base = "px-3 py-2 rounded-xl text-sm font-medium";

  const styles = {
    default: "bg-blue-700 text-white hover:bg-blue-800",
    outline: "border border-gray-300 bg-white",
    secondary: "bg-gray-200",
    destructive: "bg-red-600 text-white",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}