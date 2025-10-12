import { useEffect, useState } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

export default function ThemeToggle() {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-800
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300 cursor-pointer"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
