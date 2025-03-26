import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react"; // Import icons

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-500 text-green-700"
      : "bg-red-50 border-red-500 text-red-700";

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} border rounded-md shadow-subtle p-4 z-50 max-w-md animate-slideIn`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-2" />
          <p>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-neutral-500 hover:text-neutral-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
