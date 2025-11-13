// src/__tests__/ForgotPassword.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import ForgotPassword from "../components/ForgotPassword";

test("renders ForgotPassword modal and shows validation error when fields missing", () => {
  render(
    <ForgotPassword
      open={true}
      closeModal={jest.fn()}
      switchToLogin={jest.fn()}
    />
  );

  // Modal should render
  expect(screen.getByText(/reset password/i)).toBeInTheDocument();

  // Click "Update Password" with no fields filled
  fireEvent.click(screen.getByRole("button", { name: /update password/i }));

  // Should show password mismatch error
  expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
});