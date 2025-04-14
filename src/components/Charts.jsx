import React from "react";
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Charts = ({ filterTransactions }) => {
  // Data for expense categories
  const expenseData = filterTransactions.reduce((acc, transaction) => {
    if (transaction.type === "Expense") {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Data for income categories
  const incomeData = filterTransactions.reduce((acc, transaction) => {
    if (transaction.type === "Income") {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Convert to array
  const expensePieData = Object.entries(expenseData).map(([name, value]) => ({
    name,
    value,
  }));
  const incomePieData = Object.entries(incomeData).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for expense chart
  const EXPENSE_COLORS = [
    "#9336fd",
    "#ffab00",
    "#a0e426",
    "#33a8c7",
    "#d883ff",
    "#fdf148",
    "#f050ae",
    "#52e3e1",
    "#f77976",
  ];

  // Colors for income chart
  const INCOME_COLORS = ["#ce6a85", "#7c6a0a", "#0f4c5c", "#e36414", "#d62828"];

  return (
    <div className="w-full p-4 flex flex-col gap-8 justify-center items-center sm:gap-20 sm:flex-row mb-2">
      {/* Expense chart */}
      <div>
        <h3 className="text-xl font-semibold">Expense Categories</h3>

        <div className="h-[300px] mt-4">
          {/* If there are expense data, show the chart */}
          {expensePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensePieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            // If there is no expense data, show a message
            <p className="flex justify-center items-center h-full text-lg">
              No data available
            </p>
          )}
        </div>
      </div>

      {/* Income chart */}
      <div>
        <h3 className="text-xl font-semibold">Income Categories</h3>

        <div className="h-[300px] mt-4">
          {/* If there are income data, show the chart */}
          {incomePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomePieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomePieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={INCOME_COLORS[index % INCOME_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            // If there is no income data, show a message
            <p className="flex justify-center items-center h-full text-lg">
              No data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
