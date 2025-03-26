import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Navbar from "./ui/Navbar";
import { Home, Users, Plus } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="w-4 h-4" />,
      isActive: currentPath === "/",
    },
    {
      label: "Customers",
      href: "/customers",
      icon: <Users className="w-4 h-4" />,
      isActive: currentPath.includes("/customers"),
    },
  ];

  const actions = (
    <Link
      to="/customers/create"
      className="flex items-center px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100 rounded-md text-sm font-medium transition-colors"
    >
      <Plus className="w-4 h-4 mr-1" />
      New Customer
    </Link>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar items={navItems} actions={actions} />
      <main className="container mx-auto px-4 py-6 max-w-6xl">{children}</main>
    </div>
  );
};

export default Layout;
