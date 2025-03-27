import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    // Adjust if we're showing fewer than maxPagesToShow
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    if (startPage > 0) {
      pages.push(
        <button
          key="first"
          onClick={() => onPageChange(0)}
          className="w-8 h-8 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-100 flex items-center justify-center transition-colors"
          aria-label="Go to first page"
        >
          1
        </button>
      );

      if (startPage > 1) {
        pages.push(
          <span
            key="ellipsis1"
            className="flex items-center justify-center w-8"
          >
            <span className="text-neutral-400">•••</span>
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
            i === currentPage
              ? "bg-primary-600 text-white shadow-sm"
              : "text-neutral-700 hover:bg-neutral-100"
          }`}
          aria-label={`Page ${i + 1}`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i + 1}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(
          <span
            key="ellipsis2"
            className="flex items-center justify-center w-8"
          >
            <span className="text-neutral-400">•••</span>
          </span>
        );
      }

      pages.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages - 1)}
          className="w-8 h-8 rounded-md text-sm font-medium text-neutral-600 hover:bg-neutral-100 flex items-center justify-center transition-colors"
          aria-label="Go to last page"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-4">
      <div className="text-sm text-neutral-500 font-medium">
        Page {currentPage + 1} of {totalPages}
      </div>

      <div className="flex items-center">
        <button
          disabled={currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center justify-center h-8 w-8 rounded-md mr-1 transition-colors ${
            currentPage === 0
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-700 hover:bg-neutral-100"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-1 bg-neutral-50 rounded-md py-1 px-1 border border-neutral-100">
          {renderPageNumbers()}
        </div>

        <button
          disabled={currentPage === totalPages - 1}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center h-8 w-8 rounded-md ml-1 transition-colors ${
            currentPage === totalPages - 1
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-700 hover:bg-neutral-100"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
