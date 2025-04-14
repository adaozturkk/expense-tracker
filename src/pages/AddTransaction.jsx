import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { checkValidInput } from "../utils/checkValidInput";

const AddTransaction = ({
  desc,
  setDesc,
  type,
  setType,
  category,
  setCategory,
  amount,
  setAmount,
  date,
  setDate,
  setTransactions,
}) => {
  // Navigation hook to navigate to the home page
  const navigate = useNavigate();

  // State to proceed to the home page
  const [proceedHome, setProceedHome] = useState(false);

  // Add transaction
  const addTransaction = () => {
    // Create a new transaction
    const transaction = {
      id: Date.now(),
      desc: desc,
      type: type,
      category: category,
      amount: parseFloat(amount),
      date: date,
    };

    // Check if the input is valid
    if (checkValidInput(amount, date)) {
      // Add the transaction to the transactions array
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);

      // Reset the form
      setDesc("");
      setType("Expense");
      setCategory("Housing");
      setAmount("");
      setDate(null);

      // Proceed to the home page
      setProceedHome(true);
    }
  };

  // Reset form
  useEffect(() => {
    setDesc("");
    setType("Expense");
    setCategory("Housing");
    setAmount("");
    setDate(null);
  }, []);

  // Navigate to home page
  useEffect(() => {
    if (proceedHome) {
      navigate("/");
    }
  }, [proceedHome]);

  return (
    <div className="font-poppins bg-gray-50 w-full min-h-screen text-gray-900 dark:bg-gray-900 dark:text-gray-50 transition-all relative">
      {/* Header component */}
      <Header />

      <div className="w-full flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full max-w-xl 2xl:max-w-2xl p-8 flex flex-col justify-center ">
          {/* Add transaction title */}
          <h1 className="text-left text-2xl md:text-3xl mb-5 font-medium">
            Add Transaction
          </h1>

          {/* Set description */}
          <input
            type="text"
            value={desc}
            aria-label="Setting transaction description"
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description(optional)"
            className="input mb-3 placeholder:text-gray-600 dark:placeholder:text-gray-300"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Set type */}
            <select
              value={type}
              aria-label="Setting transaction type"
              onChange={(e) => setType(e.target.value)}
              required
              className="input"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>

            {/* Set category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Setting transaction category"
              required
              className="input"
            >
              {type === "Expense" ? (
                <>
                  <option value="House">House</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Food">Food</option>
                  <option value="Bills">Bills</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Travel">Travel</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other Expense">Other Expense</option>
                </>
              ) : (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Rent">Rent</option>
                  <option value="Other Income">Other Income</option>
                </>
              )}
            </select>

            {/* Set amount */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Setting transaction amount"
              placeholder="Amount"
              required
              className="input placeholder:text-gray-600 dark:placeholder:text-gray-300"
            />

            {/* Set date */}
            <input
              type="date"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Setting transaction date"
              required
              className="input dark:[color-scheme:dark]"
            />
          </div>

          {/* Add transaction button */}
          <button
            className="btn"
            aria-label="Add new transaction"
            onClick={() => {
              addTransaction();
            }}
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
