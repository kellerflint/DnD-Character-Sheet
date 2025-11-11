import { render, screen, fireEvent } from "@testing-library/react";
import UserRegister from "../components/UserRegister";

test("renders register modal and highlights required fields", () => {
  render(
    <UserRegister
      open={true}
      closeModal={jest.fn()}
      switchToLogin={jest.fn()}
    />
  );

  // target submit button specifically
  const submitBtn = screen.getByRole("button", { name: /^register$/i });

  fireEvent.click(submitBtn);

  // this should appear only after failed validation
  expect(screen.getByText(/security question/i)).toBeInTheDocument();
});
