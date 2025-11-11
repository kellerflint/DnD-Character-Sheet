import { render, screen, fireEvent } from "@testing-library/react";
import UserLogin from "../components/UserLogin";
import { AuthProvider } from "../context/AuthenticateContext";

test("renders login modal and fills form fields", () => {
  const mockClose = jest.fn();
  const mockSwitch = jest.fn();

  render(
    <AuthProvider>
      <UserLogin
        open={true}
        closeModal={mockClose}
        switchToRegister={mockSwitch}
        switchToForgotPassword={mockSwitch}
      />
    </AuthProvider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: "test@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "pass1234" } });

  // click login button
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // validate UI state
  expect(emailInput.value).toBe("test@email.com");
  expect(passwordInput.value).toBe("pass1234");
});
