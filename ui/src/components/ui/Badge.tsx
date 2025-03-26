import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className = "",
}) => {
  const baseStyles = "inline-flex items-center font-medium";

  const variants = {
    primary: "bg-primary-100 text-primary-800",
    secondary: "bg-neutral-100 text-neutral-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
    lg: "text-sm px-3 py-1",
  };

  const radiusStyles = rounded ? "rounded-full" : "rounded";

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radiusStyles} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
