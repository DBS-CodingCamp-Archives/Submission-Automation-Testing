import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

/**
 * Skenario Pengujian:
 *
 * - RegisterInput Component
 *  - harus bisa mengetik di input nama
 *  - harus bisa mengetik di input email
 *  - harus bisa mengetik di input password
 *  - harus memanggil fungsi onRegister ketika tombol submit ditekan
 */

describe('RegisterInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterInput onRegister={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Nama Anda');

    await userEvent.type(nameInput, 'Test User');

    expect(nameInput.value).toBe('Test User');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterInput onRegister={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    await userEvent.type(emailInput, 'test@test.com');

    expect(emailInput.value).toBe('test@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterInput onRegister={() => {}} />);
    const passwordInput =
      await screen.getByPlaceholderText('Minimal 6 karakter');

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput.value).toBe('password123');
  });

  it('should call onRegister function when submit button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput onRegister={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText('Nama Anda');
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    const passwordInput =
      await screen.getByPlaceholderText('Minimal 6 karakter');
    const registerButton = await screen.getByRole('button', {
      name: /daftar sekarang/i,
    });

    await userEvent.type(nameInput, 'Test User');
    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    });
  });
});
