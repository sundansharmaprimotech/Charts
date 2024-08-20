import React from 'react';

const MonthFilter = ({ months, onMonthSelect, onDragStart, selectedMonth }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filter by Month</h3>
      <ul className="space-y-2">
        {months.map((month) => (
          <li
            key={month}
            onClick={() => onMonthSelect(month)}
            draggable
            onDragStart={(e) => onDragStart(e, month)}
            className={`cursor-pointer p-2 rounded-md transition-colors duration-200 ${
              selectedMonth === month
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {month}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthFilter;