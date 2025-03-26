import React from "react";

interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((data: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  className?: string;
  tableClassName?: string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  loadingRows?: number;
  emptyState?: React.ReactNode;
  stickyHeader?: boolean;
}

function Table<T>({
  columns,
  data,
  keyExtractor,
  className = "",
  tableClassName = "",
  onRowClick,
  isLoading = false,
  loadingRows = 5,
  emptyState,
  stickyHeader = false,
}: TableProps<T>) {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return item[column.accessor] as React.ReactNode;
  };

  const headerClass = stickyHeader ? "sticky top-0 z-10" : "";

  if (isLoading) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <table
          className={`min-w-full divide-y divide-neutral-200 ${tableClassName}`}
        >
          <thead className={`bg-neutral-50 ${headerClass}`}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {Array.from({ length: loadingRows }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table
        className={`min-w-full divide-y divide-neutral-200 ${tableClassName}`}
      >
        <thead className={`bg-neutral-50 ${headerClass}`}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={
                onRowClick
                  ? "hover:bg-neutral-50 cursor-pointer transition-colors"
                  : ""
              }
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-4 whitespace-nowrap ${
                    column.className || ""
                  }`}
                >
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
