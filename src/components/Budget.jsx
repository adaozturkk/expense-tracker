import React from "react";

const Budget = ({ filterTransactions }) => {
  // Format amount to 2 decimal places
  const formatAmount = (amount) => amount.toFixed(2);

  // Get amounts
  const amounts = filterTransactions.map((transaction) =>
    transaction.type === "Expense"
      ? parseFloat(-transaction.amount)
      : parseFloat(transaction.amount)
  );

  // Calculate balance, income, and expense
  const balance = amounts.reduce((a, b) => a + b, 0);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((a, b) => a + b, 0);
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="flex justify-center items-center flex-wrap gap-8 mt-6 mb-3 px-4">
      {/* Total income */}
      <div className="budget-card">
        <p className="text-lg font-medium" aria-label="Total income">
          Income
        </p>
        <p className="text-green-700 font-semibold dark:text-green-600 transition-colors">
          ${formatAmount(income)}
        </p>
      </div>

      {/* Total expense */}
      <div className="budget-card">
        <p className="text-lg font-medium" aria-label="Total expense">
          Expense
        </p>
        <p className="text-red-600 font-semibold dark:text-red-500 transition-colors">
          ${formatAmount(Math.abs(expense))}
        </p>
      </div>

      {/* Current balance */}
      <div className="budget-card">
        <p className="text-lg font-medium" aria-label="Current balance">
          Balance
        </p>
        <p
          className={`font-semibold transition-colors ${
            // If balance is negative, show red color, otherwise show green color
            balance < 0
              ? "text-red-600 dark:text-red-500 transition-colors"
              : "text-green-700 dark:text-green-600 transition-colors"
          }`}
        >
          ${formatAmount(balance)}
        </p>
      </div>
    </div>
  );
};

export default Budget;
