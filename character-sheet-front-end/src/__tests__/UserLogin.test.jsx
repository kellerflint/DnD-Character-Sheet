import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserLogin from '../components/UserLogin';

let loginSpy;

vi.mock('../context/AuthenticateContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    login: loginSpy,
    logout: vi.fn(),
  }),
}));

vi.mock('../api', () => ({
  loginUser: vi.fn(),
}));

describe('UserLogin', () => {
  beforeEach(() => {
    loginSpy = vi.fn();
  });

  test('renders inputs and login button', () => {
    render(
      <UserLogin
        open={true}
        closeModal={vi.fn()}
        switchToRegister={vi.fn()}
        switchToForgotPassword={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('successful submit calls loginUser and login', async () => {
    const { loginUser } = await import('../api');
    loginUser.mockResolvedValueOnce({ token: 'fake-jwt-token' });

    const closeModal = vi.fn();

    render(
      <UserLogin
        open={true}
        closeModal={closeModal}
        switchToRegister={vi.fn()}
        switchToForgotPassword={vi.fn()}
      />
    );

    await userEvent.type(screen.getByLabelText(/email address/i), 'john@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'pass123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(loginUser).toHaveBeenCalledWith({ email: 'john@mail.com', password: 'pass123' });
    expect(loginSpy).toHaveBeenCalledWith('fake-jwt-token');
    expect(closeModal).toHaveBeenCalled();
  });

  test('failed submit shows error', async () => {
    const { loginUser } = await import('../api');
    loginUser.mockRejectedValueOnce(new Error('bad creds'));

    render(
      <UserLogin
        open={true}
        closeModal={vi.fn()}
        switchToRegister={vi.fn()}
        switchToForgotPassword={vi.fn()}
      />
    );

    await userEvent.type(screen.getByLabelText(/email address/i), 'john@mail.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
  });
});