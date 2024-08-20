import React, { useState, useEffect } from 'react';
import ChatChart from './components/Charts';
import MonthFilter from './components/MonthFilter';

function App() {
  const [chatData, setChatData] = useState([]);
  const [chartType, setChartType] = useState('column2d');
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const chartTypes = [
    { value: 'column2d', label: 'Column Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'area2d', label: 'Area Chart' },
    { value: 'bar2d', label: 'Bar Chart' },
    { value: 'pie2d', label: 'Pie Chart' },
    { value: 'doughnut2d', label: 'Doughnut Chart' },
    
  ];

  useEffect(() => {
    const fetchData = () => {
      const currentDate = new Date();
      const last10Months = Array.from({ length: 10 }, (_, i) => {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        return d.toLocaleString('default', { month: 'long', year: 'numeric' });
      }).reverse();

      setMonths(last10Months);
      setSelectedMonth(last10Months[last10Months.length - 1]);

      const generateMonthData = () => {
        return Array.from({ length: 24 }, (_, i) => ({
          label: `${i.toString().padStart(2, '0')}:00`,
          value: Math.floor(Math.random() * 50).toString()
        }));
      };

      const allData = last10Months.reduce((acc, month) => {
        acc[month] = generateMonthData();
        return acc;
      }, {});

      setChatData(allData);
    };

    fetchData();
  }, []);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  const handleDragStart = (e, month) => {
    e.dataTransfer.setData('text/plain', month);
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const month = e.dataTransfer.getData('text');
    setSelectedMonth(month);
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Activity Dashboard</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <MonthFilter
              months={months}
              onMonthSelect={handleMonthSelect}
              onDragStart={handleDragStart}
              selectedMonth={selectedMonth}
            />
          </div>
          <div className="lg:w-3/4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label htmlFor="chartType" className="block mb-2 text-sm font-medium text-gray-700">
                Select Chart Type
              </label>
              <select
                id="chartType"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {chartTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              className={`bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
                isDragging
                  ? 'border-2 border-indigo-400 bg-indigo-50'
                  : 'border border-gray-200'
              }`}
            >
              {selectedMonth && chatData[selectedMonth] ? (
                <ChatChart data={chatData[selectedMonth]} chartType={chartType} />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <p className="text-center text-lg">
                    {isDragging ? "Drop month here" : "Drag a month here to display the chart"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;