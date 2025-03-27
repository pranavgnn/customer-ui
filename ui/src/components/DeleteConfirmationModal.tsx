import React from "react";
import { Button } from "./ui";

interface DeleteConfirmationModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  title,
  message,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-fadeIn">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            className="flex items-center"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex items-center gap-1.5"
            onClick={onConfirm}
            isLoading={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
