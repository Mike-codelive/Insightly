import { render, screen, fireEvent, act } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

jest.mock("./icons/MoonIcon", () => ({
  __esModule: true,
  default: () => <span data-testid="moon-icon">Moon</span>,
}));
jest.mock("./icons/SunIcon", () => ({
  __esModule: true,
  default: () => <span data-testid="sun-icon">Sun</span>,
}));

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true,
  });

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(() => {
  jest.clearAllMocks();
  document.documentElement.classList.remove("dark");
});

describe("ThemeToggle Component", () => {
  test("renders with initial theme based on localStorage or prefers-color-scheme", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    const moonIcon = screen.getByTestId("moon-icon");
    expect(button).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
    expect(button).toHaveClass("bg-white", "text-gray-800", "border-gray-300");
    expect(document.documentElement).not.toHaveClass("dark");

    (window.localStorage.getItem as jest.Mock).mockReturnValue("dark");
    render(<ThemeToggle />);
    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toBeInTheDocument();
    expect(button).toHaveClass(
      "dark:bg-gray-800",
      "dark:text-gray-200",
      "dark:border-gray-800"
    );
    expect(document.documentElement).toHaveClass("dark");
  });

  test("toggles theme on button click", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    const moonIcon = screen.getByTestId("moon-icon");

    expect(moonIcon).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");

    act(() => {
      fireEvent.click(button);
    });
    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    act(() => {
      fireEvent.click(button);
    });

    const moonIconAfterClick = screen.getByTestId("moon-icon");
    expect(moonIconAfterClick).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });

  test("applies hover and transition classes", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: false });
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass(
      "hover:bg-gray-200",
      "transition-colors",
      "duration-300",
      "cursor-pointer"
    );
  });
});
