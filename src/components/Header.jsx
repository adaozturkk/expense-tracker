import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Header = () => {
  // Toggle dark theme
  const { isDarkTheme, changeTheme } = useTheme();

  return (
    <div className="pt-6 mx-4 flex items-center justify-center">
      <ul className="flex items-center justify-center gap-6 sm:gap-8 border py-4 px-12 sm:px-16 rounded-full shadow-lg hover:shadow-xl transition dark:shadow-gray-800 dark:border-gray-800 dark:shadow-md dark:hover:shadow-lg">
        {/* Home link */}
        <li className="cursor-pointer" aria-label="Go to home page">
          <Link to="/">Home</Link>
        </li>

        {/* Add transaction link */}
        <li
          className="cursor-pointer text-center"
          aria-label="Go to add transaction section"
        >
          <Link to="/add-transaction">Add Transaction</Link>
        </li>

        {/* Toggle dark theme button */}
        <button onClick={() => changeTheme()} aria-label="Toggle dark theme">
          {/* Dark theme icon */}
          {isDarkTheme ? (
            <svg
              className="svg-icon text-gray-50"
              aria-label="Sun icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              />
            </svg>
          ) : (
            // Light theme icon
            <svg
              className="svg-icon text-gray-900"
              aria-label="Moon icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
              />
            </svg>
          )}
        </button>
      </ul>
    </div>
  );
};

export default Header;
