import { useState, useEffect } from "react";

const useTheme = () => {
  // Get theme from local storage
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark" ||
      (localStorage.getItem("theme") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  // Set theme in local storage
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkTheme]);

  // Toggle theme
  const changeTheme = () => setIsDarkTheme((prev) => !prev);

  // Return the theme state and the function to toggle it
  return { isDarkTheme, changeTheme };
};

export default useTheme;
