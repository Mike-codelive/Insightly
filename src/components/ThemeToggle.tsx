import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                 transition-colors duration-300"
    >
      {theme === "light" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}