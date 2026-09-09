import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

/**
 * Skenario Pengujian:
 *
 * - LoginInput Component
 *  - harus bisa mengetik di input email
 *  - harus bisa mengetik di input password
 *  - harus memanggil fungsi onLogin ketika tombol submit ditekan
 */

describe('LoginInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput onLogin={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput.value).toBe('test@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput onLogin={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('••••••••');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput.value).toBe('password123');
  });

  it('should call onLogin function when submit button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput onLogin={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    const passwordInput = await screen.getByPlaceholderText('••••••••');
    const loginButton = await screen.getByRole('button', { name: /masuk/i });

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123',
    });
  });
});
