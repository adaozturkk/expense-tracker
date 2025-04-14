import React, { useState } from "react";
import Header from "../components/Header";
import Budget from "../components/Budget";
import SearchFilter from "../components/SearchFilter";
import ItemsList from "../components/ItemsList";
import Charts from "../components/Charts";

const Home = ({
  transactions,
  setTransactions,
  filterTransactions,
  setFilterTransactions,
}) => {
  // State for showing charts
  const [showCharts, setShowCharts] = useState(false);

  return (
    <main className="font-poppins bg-gray-50 w-full min-h-screen text-gray-900 dark:bg-gray-900 dark:text-gray-50 transition-all">
      {/* Header component */}
      <Header />

      <div className="py-8 2xl:py-16 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-medium">Expense Tracker</h1>

        {/* Budget component */}
        <Budget filterTransactions={filterTransactions} />

        {/* Search filter component */}
        <SearchFilter
          transactions={transactions}
          filterTransactions={filterTransactions}
          setFilterTransactions={setFilterTransactions}
        />

        {/* Show charts button */}
        <button
          className="px-3 py-2 btn"
          aria-label="Toggle charts"
          onClick={() => setShowCharts((prev) => !prev)}
        >
          {showCharts ? "Hide Analytics" : "View Analytics"}
        </button>

        {/* Charts component according to showCharts state */}
        {showCharts ? <Charts filterTransactions={filterTransactions} /> : ""}

        {/* Items list component */}
        <div className="w-full">
          <ItemsList
            transactions={transactions}
            setTransactions={setTransactions}
            filterTransactions={filterTransactions}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
