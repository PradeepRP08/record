import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

// Mock matchMedia if not present in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Dashboard Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('record_user', JSON.stringify({ name: 'Test User' }));
  });

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  it('renders dashboard with discover tab active initially', () => {
    renderDashboard();
    
    // Check main UI elements
    expect(screen.getByText('Discover')).toBeInTheDocument();
    expect(screen.getByText('Shortlist')).toBeInTheDocument();
    
    // Check if the user profile/logout and Location filter exist
    expect(screen.getByText('T')).toBeInTheDocument(); // Extracted from 'Test User' mock
    expect(screen.getByPlaceholderText('Location')).toBeInTheDocument();
  });
});
