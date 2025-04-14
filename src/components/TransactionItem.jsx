import React from "react";
import { useNavigate } from "react-router-dom";

const TransactionItem = ({
  id,
  desc,
  type,
  category,
  amount,
  date,
  transactions,
  setTransactions,
}) => {
  // Navigation hook to navigate to the home page
  const navigate = useNavigate();

  // Delete transaction
  const deleteTransaction = () => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    }
  };

  return (
    <div className="flex items-center justify-between shadow-md px-6 py-4 rounded-md mb-4 hover:shadow-lg gap-2 dark:shadow-gray-800 min-w-[350px]">
      {/* Transaction details */}
      <div className="flex flex-col">
        <p className="font-medium text-lg">{category}</p>

        <div className="flex text-gray-700 dark:text-gray-300 transition-colors">
          <p className={`${desc !== "" ? "mr-1" : ""}`}>
            {desc !== "" ? desc + " •" : desc}
          </p>

          <p>{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Transaction amount */}
        <p
          className={`${
            type === "Expense"
              ? "text-red-600 dark:text-red-500 transition-colors"
              : "text-green-700 dark:text-green-600 transition-colors"
          } font-medium`}
        >
          {type === "Expense" ? `-$${amount}` : `+$${amount}`}
        </p>

        {/* Edit button */}
        <button onClick={() => navigate(`/edit-transaction/${id}`)}>
          {/* Edit icon */}
          <svg
            className="svg-icon text-gray-900 dark:text-gray-50"
            aria-label="Edit transaction icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        {/* Delete button */}
        <button onClick={() => deleteTransaction()}>
          {/* Delete icon */}
          <svg
            className="svg-icon text-gray-900 dark:text-gray-50"
            aria-label="Delete transaction icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
