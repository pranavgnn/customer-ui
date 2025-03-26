import React, { SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  size?: SelectSize;
  fullWidth?: boolean;
  isRequired?: boolean;
  containerClassName?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  helperText,
  error,
  size = "md",
  fullWidth = false,
  isRequired = false,
  containerClassName = "",
  className = "",
  id,
  ...props
}) => {
  // Generate a unique ID if one isn't provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  const baseSelectStyles =
    "bg-white border rounded-md w-full focus:outline-none focus:ring-2 transition-colors appearance-none pr-8";

  const sizes = {
    sm: "text-xs px-2.5 py-1.5",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-2.5",
  };

  const stateStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : "border-neutral-300 focus:border-primary-500 focus:ring-primary-200";

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <div className={`${widthStyles} ${containerClassName}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`${baseSelectStyles} ${sizes[size]} ${stateStyles} ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
              ? `${selectId}-helper`
              : undefined
          }
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-500">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error ? (
        <p id={`${selectId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={`${selectId}-helper`}
            className="mt-1 text-xs text-neutral-500"
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
};

export default Select;
