import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserDelete from '../components/UserDelete';

let logoutSpy;

vi.mock('../context/AuthenticateContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { username: 'John' },
    login: vi.fn(),
    logout: logoutSpy,
  }),
}));

vi.mock('../api', () => ({
  deleteUser: vi.fn(),
}));

describe('UserDelete', () => {
  beforeEach(() => {
    logoutSpy = vi.fn();
  });

  test('delete button disabled until confirmed', () => {
    render(<UserDelete open={true} closeModal={vi.fn()} />);
    expect(screen.getByRole('button', { name: /delete my account/i })).toBeDisabled();
  });

  test('successful delete calls API, logout, and closes', async () => {
    const { deleteUser } = await import('../api');
    deleteUser.mockResolvedValueOnce({ ok: true });

    const closeModal = vi.fn();
    render(<UserDelete open={true} closeModal={closeModal} />);

    await userEvent.type(screen.getByLabelText(/type to confirm/i), 'DELETE ACCOUNT');
    await userEvent.click(screen.getByRole('button', { name: /delete my account/i }));

    expect(deleteUser).toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });

  test('shows validation state if not confirmed', async () => {
    render(<UserDelete open={true} closeModal={vi.fn()} />);
    const input = screen.getByLabelText(/type to confirm/i);
    const deleteButton = screen.getByRole('button', { name: /delete my account/i });

    expect(deleteButton).toBeDisabled();

    await userEvent.click(input);
    await userEvent.tab(); 

    expect(deleteButton).toBeDisabled();
  });
});
