import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

jest.mock("./icons/LogoIcon", () => ({
  __esModule: true,
  default: ({ className }: { className?: string }) => (
    <svg data-testid="logo-icon" className={className} />
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("Sidebar Component", () => {
  let setOpenMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    setOpenMock = jest.fn();
    (useLocation as jest.Mock).mockReturnValue({ pathname: "/" });
  });

  test("renders Sidebar with LogoIcon and applies initial classes to desktop sidebar", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={false} setOpen={setOpenMock} />
      </MemoryRouter>
    );

    const desktopSidebar = screen.getByTestId("desktop-sidebar");
    const logoIcon = screen.getByTestId("logo-icon");
    expect(desktopSidebar).toBeInTheDocument();
    expect(logoIcon).toBeInTheDocument();
    expect(logoIcon).toHaveClass("stroke-blue-500", "mt-3.5", "rotate-0");
    expect(logoIcon).toHaveClass(
      "!transition-transform",
      "!duration-700",
      "!ease-in-out"
    );
    expect(setOpenMock).not.toHaveBeenCalled();
  });

  test("toggles mobile sidebar visibility based on open prop", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={false} setOpen={setOpenMock} />
      </MemoryRouter>
    );

    const mobileSidebar = screen.getByTestId("mobile-sidebar");
    expect(mobileSidebar).toHaveClass("-translate-x-full");

    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={true} setOpen={setOpenMock} />
      </MemoryRouter>
    );

    expect(mobileSidebar).toHaveClass("translate-x-0");
  });

  test("closes mobile sidebar on button click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={true} setOpen={setOpenMock} />
      </MemoryRouter>
    );

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  test("closes mobile sidebar on backdrop click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={true} setOpen={setOpenMock} />
      </MemoryRouter>
    );

    const backdrop = screen.getByText("Sidebar content")
      .nextSibling as HTMLElement;
    fireEvent.click(backdrop);
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  test("triggers LogoIcon rotation on route change", async () => {
    const mockLocation = { pathname: "/" };
    (useLocation as jest.Mock).mockReturnValue(mockLocation);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={false} setOpen={setOpenMock} />
      </MemoryRouter>
    );

    const logoIcon = screen.getByTestId("logo-icon");
    expect(logoIcon).toHaveClass("rotate-0");

    mockLocation.pathname = "/about";
    fireEvent.click(logoIcon);
    await waitFor(() => expect(logoIcon).toHaveClass("rotate-[360deg]"), {
      timeout: 800,
    });

    await waitFor(() => expect(logoIcon).toHaveClass("rotate-0"), {
      timeout: 900,
    });
  });
});
