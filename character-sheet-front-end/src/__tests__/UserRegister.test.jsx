import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import UserRegister from "../components/UserRegister";
import userEvent from "@testing-library/user-event";
import { registerUser } from "../api";

vi.mock("../api", () => ({
  registerUser: vi.fn(),
}));

describe("UserRegister", () => {
  const mockClose = vi.fn();
  const mockSwitchToLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getPasswordField = () => screen.getByTestId("password");
  const getConfirmPasswordField = () => screen.getByTestId("confirmPassword");

  test("renders fields and buttons", async () => {
    render(
      <UserRegister
        open={true}
        closeModal={mockClose}
        switchToLogin={mockSwitchToLogin}
      />
    );

    expect(screen.getByRole("textbox", { name: /username/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();

    expect(getPasswordField()).toBeInTheDocument();
    expect(getConfirmPasswordField()).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: /security answer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  test("validation error when question/answer missing", async () => {
    render(
      <UserRegister open={true} closeModal={vi.fn()} switchToLogin={vi.fn()} />
    );
  
    await userEvent.type(screen.getByTestId("username"), "johnsmith");
    await userEvent.type(screen.getByTestId("firstName"), "John");
    await userEvent.type(screen.getByTestId("lastName"), "Smith");
    await userEvent.type(screen.getByTestId("email"), "john@example.com");
    await userEvent.type(screen.getByTestId("password"), "pass123");
    await userEvent.type(screen.getByTestId("confirmPassword"), "pass123");
  
    await userEvent.click(screen.getByRole("button", { name: /register/i }));
  
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent(
        /please select a security question/i
      );
    }, { timeout: 1000 });
  });
  
  

  test("successful registration calls api and redirects", async () => {
    registerUser.mockResolvedValueOnce({ ok: true });

    render(
      <UserRegister
        open={true}
        closeModal={mockClose}
        switchToLogin={mockSwitchToLogin}
      />
    );

    fireEvent.change(screen.getByRole("textbox", { name: /username/i }), {
      target: { value: "johnsmith" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /first name/i }), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /last name/i }), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email address/i }), {
      target: { value: "john.smith@example.com" },
    });
    fireEvent.change(getPasswordField(), { target: { value: "abcd1234" } });
    fireEvent.change(getConfirmPasswordField(), { target: { value: "abcd1234" } });

    fireEvent.mouseDown(screen.getByLabelText(/security question/i));
    const options = await screen.findAllByRole("option");
    fireEvent.click(options[0]);

    fireEvent.change(screen.getByRole("textbox", { name: /security answer/i }), {
      target: { value: "fluffy" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockSwitchToLogin).toHaveBeenCalled();
    });

    expect(screen.getByTestId("success-message")).toHaveTextContent(/success/i);
  });
});
