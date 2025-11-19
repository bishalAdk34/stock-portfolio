import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/test-utils';
import { Dashboard } from '../pages/Dashboard';

describe('Dashboard', () => {
  it('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Portfolio Dashboard')).toBeInTheDocument();
  });

  it('displays welcome message', () => {
    render(<Dashboard />);
    expect(screen.getByText('Welcome to your stock portfolio management system')).toBeInTheDocument();
  });

  it('shows stat cards with correct titles', () => {
    render(<Dashboard />);
    expect(screen.getByText('Total Value')).toBeInTheDocument();
    expect(screen.getByText('Total Stocks')).toBeInTheDocument();
    expect(screen.getByText('Total Gain/Loss')).toBeInTheDocument();
    expect(screen.getByText('Gain/Loss %')).toBeInTheDocument();
  });

  it('displays empty state when no stocks', () => {
    render(<Dashboard />);
    expect(screen.getByText('No stocks in portfolio yet')).toBeInTheDocument();
    expect(screen.getByText('Go to Portfolio page to add your first stock')).toBeInTheDocument();
  });

  it('shows placeholder text in chart areas when no stocks', () => {
    render(<Dashboard />);
    expect(screen.getByText('Add stocks to see price trends')).toBeInTheDocument();
    expect(screen.getByText('Add stocks to see volume data')).toBeInTheDocument();
  });
});
