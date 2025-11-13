import { render, screen, fireEvent } from "@testing-library/react";
import SettingsMenu from "../components/SettingsMenu";

test("menu opens and delete action triggers callback", () => {
  const mockDelete = jest.fn();

  render(<SettingsMenu onDeleteAccount={mockDelete} />);

  // click settings button
  fireEvent.click(screen.getByRole("button"));

  // click delete account
  fireEvent.click(screen.getByText(/delete account/i));

  expect(mockDelete).toHaveBeenCalled();
});
