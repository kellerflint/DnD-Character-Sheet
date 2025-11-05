import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserRegister from "../components/UserRegister";
import { vi } from "vitest";

vi.mock("../api", () => ({ registerUser: vi.fn() }));
vi.mock("../utils/securityQuestions", () => ({
  securityQuestions: [
    { id: "pet", text: "What is the name of your first pet?" },
    { id: "school", text: "What elementary school did you attend?" },
    { id: "city", text: "In what city were you born?" },
  ],
}));

describe("UserRegister", () => {
  const setup = () => {
    const closeModal = vi.fn();
    const switchToLogin = vi.fn();
    render(
      <UserRegister
        open={true}
        closeModal={closeModal}
        switchToLogin={switchToLogin}
      />
    );
    return { closeModal, switchToLogin };
  };

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
    "renders fields and buttons",
    async () => {
      setup();

      expect(
        await screen.findByRole("heading", { name: /register/i })
      ).toBeInTheDocument();
      expect(await screen.findByLabelText(/Username/i)).toBeInTheDocument();
      expect(await screen.findByLabelText(/First Name/i)).toBeInTheDocument();
      expect(await screen.findByLabelText(/Last Name/i)).toBeInTheDocument();
      expect(await screen.findByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(await screen.findByLabelText(/Password/i)).toBeInTheDocument();
      expect(
        await screen.findByLabelText(/Confirm Password/i)
      ).toBeInTheDocument();
    },
    10000
  );

  test(
    "validation error when question/answer missing",
    async () => {
      setup();

      await userEvent.type(getField("Username"), "john");
      await userEvent.type(getField("First Name"), "John");
      await userEvent.type(getField("Last Name"), "Smith");
      await userEvent.type(getField("Email Address"), "john@mail.com");
      await userEvent.type(getField("Password"), "pass123");
      await userEvent.type(getField("Confirm Password"), "pass123");

      await userEvent.click(
        screen.getByRole("button", { name: /^register$/i })
      );

      await waitFor(() =>
        expect(
          screen.getByText(/please select a security question/i)
        ).toBeInTheDocument()
      );
    },
    10000
  );

  test(
    "successful registration calls api and redirects",
    async () => {
      vi.useFakeTimers();
      const { registerUser } = await import("../api");
      registerUser.mockResolvedValueOnce({ ok: true });

      const { switchToLogin } = setup();

      await userEvent.type(getField("Username"), "john");
      await userEvent.type(getField("First Name"), "John");
      await userEvent.type(getField("Last Name"), "Smith");
      await userEvent.type(getField("Email Address"), "john@mail.com");
      await userEvent.type(getField("Password"), "pass123");
      await userEvent.type(getField("Confirm Password"), "pass123");

      await userEvent.click(getField("Security Question"));
      await waitFor(() => screen.getAllByRole("option"));
      await userEvent.click(screen.getAllByRole("option")[0]);
      await userEvent.type(getField("Security Answer"), "max");

      await userEvent.click(
        screen.getByRole("button", { name: /^register$/i })
      );

      await waitFor(() =>
        expect(registerUser).toHaveBeenCalledWith({
          username: "john",
          firstName: "John",
          lastName: "Smith",
          email: "john@mail.com",
          password: "pass123",
          securityAnswer: "max",
        })
      );

      vi.runAllTimers();
      expect(switchToLogin).toHaveBeenCalled();
      vi.useRealTimers();
    },
    15000
  );
});
