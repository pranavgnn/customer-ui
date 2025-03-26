import React, { InputHTMLAttributes } from "react";

export type InputSize = "sm" | "md" | "lg";

type InputPropsBase = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

interface InputProps extends InputPropsBase {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  isRequired?: boolean;
  containerClassName?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  isRequired = false,
  containerClassName = "",
  className = "",
  id,
  inputMode,
  autoComplete,
  ...props
}) => {
  // Generate a unique ID if one isn't provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  const baseInputStyles =
    "bg-white border rounded-md w-full focus:outline-none focus:ring-2 transition-colors";

  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-2.5",
  };

  const stateStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200";

  const widthStyles = fullWidth ? "w-full" : "";

  const iconStyles = leftIcon || rightIcon ? (leftIcon ? "pl-9" : "pr-9") : "";

  return (
    <div className={`${widthStyles} ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`${baseInputStyles} ${sizes[size]} ${stateStyles} ${iconStyles} ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          inputMode={inputMode}
          autoComplete={autoComplete}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-neutral-500">
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

export default Input;
