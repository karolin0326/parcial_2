import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T extends Record<string, any>>({ columns, data, isLoading, emptyMessage = 'No hay datos' }: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full animate-pulse flex flex-col gap-2 mt-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-12 bg-gray-200 rounded-md w-full"></div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-6 py-3">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
