import React from "react";
import { Link } from "react-router";
import { Menu, Monitor } from "lucide-react"; // Import the monitor icon alongside menu

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  title?: string;
  titleLink?: string;
  items?: NavItem[];
  actions?: React.ReactNode;
  variant?: "default" | "transparent";
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  title = "FintechLAB",
  titleLink = "/",
  items = [],
  actions,
  variant = "default",
  className = "",
}) => {
  const baseStyles = "sticky top-0 z-30 w-full transition-all duration-200";

  const variants = {
    default: "bg-white border-b border-neutral-200 shadow-sm",
    transparent: "bg-transparent",
  };

  const renderLogo = () => {
    if (logo) return logo;

    return (
      <div className="text-xl font-bold flex items-center">
        <Monitor className="w-5 h-5 text-primary-600 mr-2" />{" "}
        <span className="text-primary-600">
          {title.substring(0, title.length - 3)}
        </span>
        <span className="text-neutral-800">
          {title.substring(title.length - 3)}
        </span>
      </div>
    );
  };

  return (
    <header className={`${baseStyles} ${variants[variant]} ${className}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Title */}
        <Link to={titleLink} className="flex-shrink-0">
          {renderLogo()}
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center space-x-1">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-neutral-600 hover:text-primary-600 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center">
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        {/* Actions (right side) */}
        {actions && (
          <div className="flex items-center space-x-2">{actions}</div>
        )}

        {/* Mobile menu button - we'll keep this simple for now */}
        <div className="sm:hidden">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none"
            aria-label="Main menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
