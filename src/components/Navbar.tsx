import { NavLink } from "react-router-dom";
import ThemeToggle from "./../components/ThemeToggle";

export default function Navbar() {
  return (
    <nav>
      <div className="flex h-14 bg-white text-black dark:text-white dark:bg-black dark:border-b dark:border-gray-900 justify-between items-center">
        <h1 className="capitalize">dashboard</h1>
        <ThemeToggle />
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "text-blue-700" : ""
          }
        >
          dashboard
        </NavLink>
      </div>
    </nav>
  );
}
