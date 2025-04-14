import React, { useEffect } from "react";
import TransactionItem from "./TransactionItem";

const ItemsList = ({ transactions, setTransactions, filterTransactions }) => {
  // Save transactions to local storage
  useEffect(() => {
    localStorage.setItem("transaction-item", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 px-4 sm:px-6 lg:px-8 mt-4">
      {/* If there are transactions, show them */}
      {filterTransactions.length > 0 ? (
        filterTransactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            id={transaction.id}
            desc={transaction.desc}
            type={transaction.type}
            category={transaction.category}
            amount={transaction.amount}
            date={transaction.date}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        ))
      ) : (
        // If there are no transactions, show a message
        <p className="col-span-full text-center text-lg font-medium">
          No transactions found.
        </p>
      )}
    </div>
  );
};

export default ItemsList;
