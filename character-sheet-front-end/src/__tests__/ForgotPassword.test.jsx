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

  // Click "Update Password" with NO fields filled
  fireEvent.click(screen.getByRole("button", { name: /update password/i }));

  // This confirms that the form is strictly enforcing requirements on every input,
  // not just the first one.
  const emailInput = screen.getByLabelText(/email/i);
  const newPasswordInput = screen.getByLabelText(/^new password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm/i);

  // All of these should be in an invalid state
  expect(emailInput).toBeInvalid();
  expect(newPasswordInput).toBeInvalid();
  expect(confirmPasswordInput).toBeInvalid();
});