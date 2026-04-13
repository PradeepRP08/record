import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

// Mock react-router-dom
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock api
vi.mock('../utils/api', () => ({
  loginUser: vi.fn()
}));

// Mock toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  it('renders login form correctly', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login to record/i })).toBeInTheDocument();
  });

  it('shows error messages for empty inputs on submit', async () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: /login to record/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows error message for invalid email format', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /login to record/i }).closest('form'));

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('calls login API successfully and redirects', async () => {
    // Mock successful response
    api.loginUser.mockResolvedValueOnce({
      data: {
        message: 'Login successful!',
        data: { token: 'fake-jwt-token', name: 'Test User' }
      }
    });

    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /login to record/i }).closest('form'));

    await waitFor(() => {
      expect(api.loginUser).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });
    
    expect(toast.success).toHaveBeenCalledWith('Login successful!');
  });

  it('handles API login failure', async () => {
    api.loginUser.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } }
    });

    renderLogin();
    
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
    
    fireEvent.submit(screen.getByRole('button', { name: /login to record/i }).closest('form'));

    await waitFor(() => {
      expect(api.loginUser).toHaveBeenCalled();
    });

    expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
  });
});
