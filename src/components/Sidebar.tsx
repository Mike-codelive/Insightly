import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LogoIcon from "./icons/LogoIcon";

type SidebarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    setRotating(false);
    const startAnimation = setTimeout(() => {
      setRotating(true);
    }, 50);

    const resetAnimation = setTimeout(() => {
      setRotating(false);
    }, 750);

    return () => {
      clearTimeout(startAnimation);
      clearTimeout(resetAnimation);
    };
  }, [location.pathname]);

  return (
    <>
      <aside
        data-testid="desktop-sidebar"
        className="hidden lg:flex absolute left-0 top-0 bottom-0 flex-col items-center w-14 border-r border-[var(--border-color-light)] bg-[var(--bg-color-light)] dark:bg-[var(--bg-color-dark)] dark:border-[var(--border-color-dark)]"
      >
        <NavLink to="/">
          <LogoIcon
            className={`stroke-blue-500 mt-3.5 !transition-transform !duration-700 !ease-in-out ${
              rotating ? "rotate-[360deg]" : "rotate-0"
            }`}
          />
        </NavLink>
      </aside>

      <aside
        data-testid="mobile-sidebar"
        className={`fixed top-14 bottom-0 left-0 z-20 w-full lg:hidden 
              transform transition-transform duration-300 ease-in-out 
              ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="w-64 h-full bg-[var(--bg-color)] border-r border-[var(--border-color)] p-4">
          <button
            className="mb-4 p-2 border border-[var(--border-color)] rounded"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          Sidebar content
        </div>

        <div
          className="absolute inset-0 bg-[var(--bg-color-light)] dark:bg-[var(--bg-color-dark)]"
          onClick={() => setOpen(false)}
        ></div>
      </aside>
    </>
  );
}
