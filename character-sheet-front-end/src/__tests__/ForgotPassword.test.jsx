import { vi } from "vitest";

vi.mock("../api", () => ({ updatePassword: vi.fn() }));
vi.mock("../utils/securityQuestions", () => ({
  securityQuestions: [
    { id: "pet", text: "What is the name of your first pet?" },
    { id: "school", text: "What elementary school did you attend?" },
    { id: "city", text: "In what city were you born?" },
  ],
}));

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "../components/ForgotPassword";

describe("ForgotPassword", () => {
  test("shows error when passwords mismatch", async () => {
    render(<ForgotPassword open={true} closeModal={() => {}} switchToLogin={() => {}} />);

    await userEvent.type(screen.getByLabelText(/email address/i), "john@mail.com");
    await userEvent.click(screen.getByLabelText(/security question/i));
    await waitFor(() => screen.getAllByRole("option"));
    await userEvent.click(screen.getAllByRole("option")[0]);
    await userEvent.type(screen.getByLabelText(/security answer/i), "max");

    await userEvent.type(screen.getByTestId("newPassword"), "abc");
    await userEvent.type(screen.getByTestId("confirmPassword"), "xyz");
    await userEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() =>
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    );
  });

  test("successful update shows success message and redirects", async () => {
    const { updatePassword } = await import("../api"); 
    updatePassword.mockResolvedValueOnce({ ok: true });

    const closeModal = vi.fn();
    const switchToLogin = vi.fn();

    render(<ForgotPassword open={true} closeModal={closeModal} switchToLogin={switchToLogin} />);

    await userEvent.type(screen.getByLabelText(/email address/i), "john@mail.com");
    await userEvent.click(screen.getByLabelText(/security question/i));
    await waitFor(() => screen.getAllByRole("option"));
    await userEvent.click(screen.getAllByRole("option")[0]);
    await userEvent.type(screen.getByLabelText(/security answer/i), "max");
    await userEvent.type(screen.getByTestId("newPassword"), "abc123");
    await userEvent.type(screen.getByTestId("confirmPassword"), "abc123");
    await userEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() =>
      expect(screen.getByText(/password updated successfully/i)).toBeInTheDocument()
    );

    expect(updatePassword).toHaveBeenCalledWith({
      email: "john@mail.com",
      securityAnswer: "max",
      newPassword: "abc123",
    });

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
      expect(switchToLogin).toHaveBeenCalled();
    });
  }, 10000);
});
