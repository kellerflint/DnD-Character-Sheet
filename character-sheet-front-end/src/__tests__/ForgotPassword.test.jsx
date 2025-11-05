import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgotPassword from "../components/ForgotPassword";
import { vi } from "vitest";

vi.mock("../api", () => ({ updatePassword: vi.fn() }));
vi.mock("../utils/securityQuestions", () => ({
  securityQuestions: [
    { id: "pet", text: "What is the name of your first pet?" },
    { id: "school", text: "What elementary school did you attend?" },
    { id: "city", text: "In what city were you born?" },
  ],
}));

describe("ForgotPassword", () => {
  const setup = () =>
    render(
      <ForgotPassword open={true} closeModal={vi.fn()} switchToLogin={vi.fn()} />
    );

  const getField = (label) => {
    if (/^new password$/i.test(label))
      return screen.getByLabelText(/^New Password\s*\*?$/i);
    if (/^confirm new password$/i.test(label))
      return screen.getByLabelText(/^Confirm New Password\s*\*?$/i);
    if (/^password$/i.test(label))
      return screen.getByLabelText(/^Password\s*\*?$/i);
    if (/^confirm password$/i.test(label))
      return screen.getByLabelText(/^Confirm Password\s*\*?$/i);
    return screen.getByLabelText(new RegExp(`${label}\\s*\\*?`, "i"));
  };

  test(
    "shows error when passwords mismatch",
    async () => {
      setup();

      await userEvent.type(getField("Email Address"), "john@mail.com");
      await userEvent.click(getField("Security Question"));
      await waitFor(() => screen.getAllByRole("option"));
      await userEvent.click(screen.getAllByRole("option")[0]);
      await userEvent.type(getField("Security Answer"), "max");
      await userEvent.type(getField("New Password"), "abc");
      await userEvent.type(getField("Confirm New Password"), "xyz");
      await userEvent.click(
        screen.getByRole("button", { name: /update password/i })
      );

      await waitFor(() =>
        expect(
          screen.getByText(/passwords do not match/i)
        ).toBeInTheDocument()
      );
    },
    10000
  );

  test(
    "successful update shows success message and redirects",
    async () => {
      vi.useFakeTimers();
      const { updatePassword } = await import("../api");
      updatePassword.mockResolvedValueOnce({ ok: true });

      const closeModal = vi.fn();
      const switchToLogin = vi.fn();

      render(
        <ForgotPassword
          open={true}
          closeModal={closeModal}
          switchToLogin={switchToLogin}
        />
      );

      await userEvent.type(getField("Email Address"), "john@mail.com");
      await userEvent.click(getField("Security Question"));
      await waitFor(() => screen.getAllByRole("option"));
      await userEvent.click(screen.getAllByRole("option")[0]);
      await userEvent.type(getField("Security Answer"), "max");
      await userEvent.type(getField("New Password"), "abc123");
      await userEvent.type(getField("Confirm New Password"), "abc123");

      await userEvent.click(
        screen.getByRole("button", { name: /update password/i })
      );

      await waitFor(() =>
        expect(
          screen.getByText(/password updated successfully/i)
        ).toBeInTheDocument()
      );

      vi.runAllTimers();
      expect(updatePassword).toHaveBeenCalledWith({
        email: "john@mail.com",
        securityAnswer: "max",
        newPassword: "abc123",
      });
      expect(closeModal).toHaveBeenCalled();
      expect(switchToLogin).toHaveBeenCalled();

      vi.useRealTimers();
    },
    15000
  );
});
