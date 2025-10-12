import { NavLink } from "react-router-dom";
import ThemeToggle from "./../components/ThemeToggle";
import Avatar from "./Avatar";
import MenuIcon from "./icons/MenuIcon";

type NavbarProps = {
  onToggleSidebar: () => void;
};

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <nav>
      <div className="flex h-14 border-b border-[var(--border-color-light)] dark:border-[var(--border-color-dark)] bg-[var(--bg-color-light)] dark:bg-[var(--bg-color-dark)] justify-end items-center">
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-md"
          onClick={onToggleSidebar}
        >
          <MenuIcon />
        </button>
        <ThemeToggle />
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "text-blue-700" : ""
          }
        >
          dashboard
        </NavLink>
        <Avatar />
      </div>
    </nav>
  );
}
