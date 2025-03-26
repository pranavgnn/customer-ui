import React, { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react"; // Import the loading spinner icon

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "text"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none";

  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-sm",
    secondary:
      "bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-800 shadow-sm",
    outline:
      "bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50",
    text: "bg-transparent text-primary-600 hover:text-primary-700 hover:bg-primary-50 shadow-none",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-2.5",
  };

  // Enhanced disabled styles for better visual feedback
  const disabledStyles =
    disabled || isLoading
      ? "opacity-60 cursor-not-allowed pointer-events-none"
      : "";

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
