import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { checkValidInput } from "../utils/checkValidInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      date: date ? formatDateToLocal(date) : null,
    };

    // Check if the input is valid
    if (checkValidInput(amount, date)) {
      // Add the transaction to the transactions array
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);

      // Reset the form
      setDesc("");
      setType("Expense");
      setCategory("House");
      setAmount("");
      setDate(null);

      // Proceed to the home page
      setProceedHome(true);
    }
  };

  // Format date to local time zone
  const formatDateToLocal = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  // Reset form
  useEffect(() => {
    setDesc("");
    setType("Expense");
    setCategory("House");
    setAmount("");
    setDate(null);
  }, []);

  // Update category when type changes
  useEffect(() => {
    if (type === "Expense") {
      setCategory("House"); // Default category for expense
    } else if (type === "Income") {
      setCategory("Salary"); // Default category for income
    }
  }, [type, setCategory]);

  // Navigate to home page
  useEffect(() => {
    if (proceedHome) {
      navigate("/");
    }
  }, [proceedHome]);

  return (
    <div className="font-poppins bg-gray-50 dark:bg-gray-900 w-full min-h-screen text-gray-900 dark:text-gray-50 transition relative">
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
            className="input mb-3"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Set type */}
            <div className="relative">
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

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Set category */}
            <div className="relative">
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

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Set amount */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Setting transaction amount"
              placeholder="Amount"
              required
              className="input"
            />

            {/* Set date */}
            <div className="relative w-full">
              <DatePicker
                className="input pl-8"
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Date"
                calendarClassName="dark:!bg-gray-600"
                isClearable={true}
              />

              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"></path>
                </g>
              </svg>
            </div>
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
