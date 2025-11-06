import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsMenu from '../components/SettingsMenu';

describe('SettingsMenu', () => {
  test('opens menu and triggers delete callback', async () => {
    const onDeleteAccount = vi.fn();
    render(<SettingsMenu onDeleteAccount={onDeleteAccount} />);

    const [settingsButton] = screen.getAllByRole('button');
    await userEvent.click(settingsButton);

    const menu = await screen.findByRole('menu');
    const deleteItem = within(menu).getByText(/delete account/i);
    await userEvent.click(deleteItem);

    expect(onDeleteAccount).toHaveBeenCalled();
  });
});
