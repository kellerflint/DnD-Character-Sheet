import { render, screen } from "@testing-library/react";
import CharacterSheet from "../components/CharacterSheet";

test("renders character sheet with stats", () => {
  render(<CharacterSheet />);

  expect(screen.getByText(/Strength/i)).toBeInTheDocument();
  expect(screen.getByText(/Dexterity/i)).toBeInTheDocument();
  expect(screen.getByText(/Wisdom/i)).toBeInTheDocument();
});
