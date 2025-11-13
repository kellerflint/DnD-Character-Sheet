import { render, screen } from '@testing-library/react';
import CharacterSheet from '../components/CharacterSheet';

describe('CharacterSheet', () => {
  test('renders top fields and skill names', () => {
    render(<CharacterSheet />);

    expect(screen.getByLabelText(/character name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/class/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/background/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/race/i)).toBeInTheDocument();

    ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception'].forEach(s =>
      expect(screen.getByText(s)).toBeInTheDocument()
    );
  });

  test('renders stat boxes and HP fields', () => {
    render(<CharacterSheet />);
    ['Strength','Dexterity','Constitution','Intelligence','Wisdom','Charisma'].forEach(label =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );
    expect(screen.getByLabelText(/current hp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/temporary hp/i)).toBeInTheDocument();
  });
});
