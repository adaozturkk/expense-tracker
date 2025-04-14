import React, { useEffect, useMemo, useState } from "react";

const SearchFilter = ({
  transactions,
  filterTransactions,
  setFilterTransactions,
}) => {
  // State for filter type
  const [filterType, setFilterType] = useState("All Types");

  // State for filter category
  const [filterCategory, setFilterCategory] = useState("All Categories");

  // State for filter sort
  const [filterSort, setFilterSort] = useState("DateDesc");

  // State for start date
  const [startDate, setStartDate] = useState(null);

  // State for end date
  const [endDate, setEndDate] = useState(null);

  // State for search
  const [search, setSearch] = useState("");

  // Memoize filtered transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Filter type and category
    filtered = filtered.filter((transaction) => {
      const matchType =
        filterType !== "All Types" ? transaction.type === filterType : true;
      const matchCategory =
        filterCategory !== "All Categories"
          ? transaction.category === filterCategory
          : true;
      return matchType && matchCategory;
    });

    // Sort date and price
    if (filterSort === "DateDesc") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filterSort === "DateAsc") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filterSort === "PriceDesc") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else {
      filtered.sort((a, b) => a.amount - b.amount);
    }

    // Filter date range
    if (startDate) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (transaction) => new Date(transaction.date) <= new Date(endDate)
      );
    }

    // Search with description
    if (search.trim() !== "") {
      filtered = filtered.filter((transaction) =>
        transaction.desc.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }, [
    transactions,
    filterType,
    filterCategory,
    filterSort,
    startDate,
    endDate,
    search,
  ]);

  // Update filtered transactions when filtering changes
  useEffect(() => {
    setFilterTransactions(filteredTransactions);
  }, [filteredTransactions, setFilterTransactions]);

  return (
    <div className="w-full max-w-3xl my-3 px-6">
      {/* Search Bar */}
      <div className="relative mb-2">
        {/* Search input */}
        <input
          type="text"
          aria-label="Search transaction by description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transaction..."
          className="input pl-10 pr-4 placeholder:text-gray-600 dark:placeholder:text-gray-300"
        />

        {/* Search icon */}
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Search icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Filter Type */}
        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input"
            aria-label="Filter transaction by type"
          >
            <option value="All Types">All Types</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        {/* Filter Category */}
        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input"
            aria-label="Filter transaction by category"
          >
            {(() => {
              switch (filterType) {
                case "Expense":
                  return (
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
                  );
                case "Income":
                  return (
                    <>
                      <option value="Salary">Salary</option>
                      <option value="Investment">Investment</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Rent">Rent</option>
                      <option value="Other Income">Other Income</option>
                    </>
                  );
                default:
                  return (
                    <>
                      <option value="All Categories">All Categories</option>
                      <option value="House">House</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Food">Food</option>
                      <option value="Bills">Bills</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Travel">Travel</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other Expense">Other Expense</option>
                      <option value="Salary">Salary</option>
                      <option value="Investment">Investment</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Rent">Rent</option>
                      <option value="Other Income">Other Income</option>
                    </>
                  );
              }
            })()}
          </select>
        </div>

        {/* Filter Sort */}
        <div>
          <select
            value={filterSort}
            onChange={(e) => setFilterSort(e.target.value)}
            className="input"
            aria-label="Filter transaction by sort"
          >
            <option value="DateDesc">Date (Newest First)</option>
            <option value="DateAsc">Date (Oldest First)</option>
            <option value="PriceDesc">Price (Hight to Low)</option>
            <option value="PriceAsc">Price (Low to High)</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="flex col-span-full justify-center gap-2">
          {/* Start date */}
          <div className="flex-1 max-w-[200px]">
            <input
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="input dark:[color-scheme:dark]"
              aria-label="Transaction start date"
            />
          </div>

          {/* End date */}
          <div className="flex-1 max-w-[200px]">
            <input
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="input dark:[color-scheme:dark]"
              aria-label="Transaction end date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
