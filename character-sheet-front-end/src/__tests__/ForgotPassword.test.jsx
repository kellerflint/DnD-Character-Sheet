import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "../components/ForgotPassword";

test("validates that all required fields are invalid when left empty", () => {
  render(
    <ForgotPassword
      open={true}
      closeModal={jest.fn()}
      switchToLogin={jest.fn()}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: /update password/i }));

  const emailInput = screen.getByLabelText(/email/i);
  const newPasswordInput = screen.getByLabelText(/^new password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm/i);

  expect(emailInput).toBeInvalid();
  expect(newPasswordInput).toBeInvalid();
  expect(confirmPasswordInput).toBeInvalid();
});