import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  className = "",
  style = {},
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          background: disabled
            ? "linear-gradient(135deg, #9ca3af, #6b7280)"
            : "linear-gradient(135deg, #2563eb, #4f46e5)",
          color: "white",
          border: "none",
        };
      case "secondary":
        return {
          background: disabled
            ? "linear-gradient(135deg, #9ca3af, #6b7280)"
            : "linear-gradient(135deg, #059669, #047857)",
          color: "white",
          border: "none",
        };
      case "outline":
        return {
          backgroundColor: "white",
          color: "#374151",
          border: "1px solid #d1d5db",
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { padding: "8px 16px", fontSize: "14px" };
      case "md":
        return { padding: "12px 24px", fontSize: "16px" };
      case "lg":
        return { padding: "16px 32px", fontSize: "18px" };
      default:
        return {};
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "12px",
        fontWeight: "600",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
    >
      {children}
    </button>
  );
};
