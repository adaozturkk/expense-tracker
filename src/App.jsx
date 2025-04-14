import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import EditTransaction from "./pages/EditTransaction";

function App() {
  // State for description  
  const [desc, setDesc] = useState("");

  // State for type
  const [type, setType] = useState("Expense");

  // State for category
  const [category, setCategory] = useState("House");

  // State for amount
  const [amount, setAmount] = useState(0);

  // State for date
  const [date, setDate] = useState(null);

  // State for getting transactions from local storage
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transaction-item");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  // State for filtering transactions
  const [filterTransactions, setFilterTransactions] = useState([]);

  // Effect to initialize filterTransactions with sorted transactions
  useEffect(() => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setFilterTransactions(sortedTransactions);
  }, [transactions]);

  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <Home
              transactions={transactions}
              setTransactions={setTransactions}
              filterTransactions={filterTransactions}
              setFilterTransactions={setFilterTransactions}
            />
          }
        />

        {/* Add transaction route */}
        <Route
          path="/add-transaction"
          element={
            <AddTransaction
              desc={desc}
              setDesc={setDesc}
              type={type}
              setType={setType}
              category={category}
              setCategory={setCategory}
              amount={amount}
              setAmount={setAmount}
              date={date}
              setDate={setDate}
              setTransactions={setTransactions}
            />
          }
        />

        {/* Edit transaction route */}
        <Route
          path="/edit-transaction/:id"
          element={
            <EditTransaction
              desc={desc}
              setDesc={setDesc}
              type={type}
              setType={setType}
              category={category}
              setCategory={setCategory}
              amount={amount}
              setAmount={setAmount}
              date={date}
              setDate={setDate}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
