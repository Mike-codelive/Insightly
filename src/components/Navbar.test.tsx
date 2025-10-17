import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

jest.mock("./../components/ThemeToggle", () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));
jest.mock("./Avatar", () => ({
  __esModule: true,
  default: () => <div data-testid="avatar">Avatar</div>,
}));
jest.mock("./icons/MenuIcon", () => ({
  __esModule: true,
  default: () => <span data-testid="menu-icon">Menu</span>,
}));

describe("Navbar Component", () => {
  let onToggleSidebarMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    onToggleSidebarMock = jest.fn();
  });

  test("renders Navbar with all elements", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar onToggleSidebar={onToggleSidebarMock} />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    const menuButton = screen.getByTestId("menu-icon");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.closest("button")).toHaveClass(
      "lg:hidden",
      "fixed",
      "top-4",
      "left-4"
    );

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByText("dashboard")).toBeInTheDocument();
    expect(screen.getByText("settings")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toBeInTheDocument();

    const dashboardLink = screen.getByText("dashboard");
    expect(dashboardLink).toHaveClass("text-blue-700");
    const settingsLink = screen.getByText("settings");
    expect(settingsLink).not.toHaveClass("text-blue-700");
  });

  test("toggles sidebar on menu button click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar onToggleSidebar={onToggleSidebarMock} />
      </MemoryRouter>
    );

    const menuButton = screen.getByTestId("menu-icon").closest("button");
    fireEvent.click(menuButton!);
    expect(onToggleSidebarMock).toHaveBeenCalledTimes(1);
  });

  test("applies active class to NavLink based on current route after click", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar onToggleSidebar={onToggleSidebarMock} />
      </MemoryRouter>
    );

    let dashboardLink = screen.getByText("dashboard");
    let settingsLink = screen.getByText("settings");
    expect(dashboardLink).toHaveClass("text-blue-700");
    expect(settingsLink).not.toHaveClass("text-blue-700");

    const settingsLinkElement = settingsLink.closest("a")!;
    fireEvent.click(settingsLinkElement);

    await waitFor(
      () => {
        dashboardLink = screen.getByText("dashboard");
        settingsLink = screen.getByText("settings");
        expect(dashboardLink).not.toHaveClass("text-blue-700");
        expect(settingsLink).toHaveClass("text-blue-700");
      },
      { timeout: 1000 }
    );
  });

  test("does not apply classes when route is pending", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar onToggleSidebar={onToggleSidebarMock} />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText("dashboard");
    expect(dashboardLink).toHaveClass("text-blue-700");
  });
});
