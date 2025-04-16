import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { checkValidInput } from "../utils/checkValidInput";

const EditTransaction = ({
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
  transactions,
  setTransactions,
}) => {
  // Navigation hook to navigate to the home page
  const navigate = useNavigate();

  // id of the transaction to edit
  const { id } = useParams();

  // Get the transaction to edit
  useEffect(() => {
    const transaction = transactions.find(
      (transaction) => transaction.id === parseInt(id)
    );

    // if transaction can't be found goes back to home page
    if (transaction) {
      setDesc(transaction.desc);
      setType(transaction.type);
      setCategory(transaction.category);
      setAmount(transaction.amount);
      setDate(transaction.date);
    } else {
      navigate("/");
    }
  }, [id, transactions]);

  // Edit the transaction
  const editTransaction = () => {
    // Create edited transaction
    const editedTransaction = {
      id: parseInt(id),
      desc: desc,
      type: type,
      category: category,
      amount: parseFloat(amount),
      date: date,
    };

    // Check if the input is valid
    if (checkValidInput(amount, date)) {
      setTransactions((prev) => {
        return prev.map((transaction) =>
          transaction.id === parseInt(id) ? editedTransaction : transaction
        );
      });

      // Reset the form
      setDesc("");
      setType("Expense");
      setCategory("House");
      setAmount("");
      setDate(null);

      // Navigate to the home page
      navigate("/");
    }
  };

  return (
    <div className="font-poppins bg-gray-50 dark:bg-gray-900 w-full min-h-screen text-gray-900 dark:text-gray-50 transition relative">
      {/* Header component */}
      <Header />

      <div className="w-full flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-full max-w-xl 2xl:max-w-2xl p-8 flex flex-col justify-center ">
          {/* Edit transaction title */}
          <h1 className="text-left text-2xl md:text-3xl mb-5 font-medium">
            Edit Transaction
          </h1>

          {/* Edit description */}
          <input
            type="text"
            value={desc}
            aria-label="Edit transaction description"
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description(optional)"
            className="input mb-3 placeholder:text-gray-600 dark:placeholder:text-gray-300"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {/* Edit type */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              aria-label="Edit transaction type"
              required
              className="input"
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>

            {/* Edit category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Edit transaction category"
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

            {/* Edit amount */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Edit transaction amount"
              placeholder="Amount"
              required
              className="input"
            />

            {/* Edit date */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              aria-label="Edit transaction date"
              required
              className="input dark:[color-scheme:dark]"
            />
          </div>

          {/* Edit transaction button */}
          <button
            className="btn"
            aria-label="Edit transaction"
            onClick={() => {
              editTransaction();
            }}
          >
            Edit Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransaction;
