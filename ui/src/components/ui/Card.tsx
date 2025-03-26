import React from "react";

export type CardVariant = "default" | "bordered" | "subtle";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  title,
  footer,
  fullWidth = false,
  onClick,
  hoverable = false,
}) => {
  const baseStyles = "bg-white rounded-lg overflow-hidden";

  const variants = {
    default: "shadow-card",
    bordered: "border border-neutral-200",
    subtle: "bg-neutral-50 border border-neutral-100",
  };

  const hoverStyles = hoverable
    ? "transition-shadow hover:shadow-elevated cursor-pointer"
    : "";
  const widthStyles = fullWidth ? "w-full" : "";
  const clickableProps = onClick
    ? { onClick, tabIndex: 0, role: "button" }
    : {};

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${widthStyles} ${className}`}
      {...clickableProps}
    >
      {title && (
        <div className="px-6 py-4 border-b border-neutral-200">
          {typeof title === "string" ? (
            <h3 className="font-medium text-lg text-neutral-800">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
      {footer && (
        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
