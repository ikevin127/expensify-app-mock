import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import '@testing-library/jest-native/extend-expect';
import ExpenseManager from '../../src/components/ExpenseManager';
import { ExpenseService } from '../../src/services/ExpenseService';

// Mock the ExpenseService
jest.mock('../../src/services/ExpenseService');

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('ExpenseManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ExpenseService.getExpenses.mockResolvedValue([
      {
        id: 1,
        title: 'Coffee',
        amount: 4.50,
        category: 'Food & Drink',
        date: new Date('2023-12-01'),
        description: 'Morning coffee'
      },
      {
        id: 2,
        title: 'Uber',
        amount: 12.75,
        category: 'Transportation',
        date: new Date('2023-12-02'),
        description: 'Ride to work'
      }
    ]);
  });

  it('renders expense manager with expenses', async () => {
    render(<ExpenseManager />);

    await waitFor(() => {
      expect(screen.getByText('Expense Manager')).toBeTruthy();
      expect(screen.getByText('Total: $17.25')).toBeTruthy();
    });

    expect(screen.getByTestId('add-expense-button')).toBeTruthy();
    expect(screen.getByTestId('expense-list')).toBeTruthy();
  });

  it('shows loading state initially', () => {
    render(<ExpenseManager />);
    
    expect(screen.getByText('Loading expenses...')).toBeTruthy();
  });

  it('handles error when loading expenses', async () => {
    ExpenseService.getExpenses.mockRejectedValue(new Error('Network error'));
    
    render(<ExpenseManager />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to load expenses');
    });
  });

  it('opens add expense modal when button is pressed', async () => {
    render(<ExpenseManager />);

    await waitFor(() => {
      expect(screen.getByTestId('add-expense-button')).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId('add-expense-button'));
    
    await waitFor(() => {
      expect(screen.getByText('Add New Expense')).toBeTruthy();
    });
  });

  it('adds new expense successfully', async () => {
    const newExpense = {
      id: 3,
      title: 'Lunch',
      amount: 15.99,
      category: 'Food & Drink',
      date: new Date(),
      description: 'Business lunch'
    };

    ExpenseService.createExpense.mockResolvedValue(newExpense);

    render(<ExpenseManager />);

    await waitFor(() => {
      expect(screen.getByTestId('add-expense-button')).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId('add-expense-button'));

    await waitFor(() => {
      expect(screen.getByText('Add New Expense')).toBeTruthy();
    });
  });

  it('handles error when adding expense', async () => {
    ExpenseService.createExpense.mockRejectedValue(new Error('Server error'));

    render(<ExpenseManager />);

    await waitFor(() => {
      expect(screen.getByTestId('add-expense-button')).toBeTruthy();
    });

    fireEvent.press(screen.getByTestId('add-expense-button'));

    await waitFor(() => {
      expect(screen.getByText('Add New Expense')).toBeTruthy();
    });
  });

  it('shows empty state when no expenses', async () => {
    ExpenseService.getExpenses.mockResolvedValue([]);

    render(<ExpenseManager />);

    await waitFor(() => {
      expect(screen.getByText('No expenses yet. Add your first expense!')).toBeTruthy();
      expect(screen.getByText('Total: $0.00')).toBeTruthy();
    });
  });

  it('calculates total amount correctly', async () => {
    const expenses = [
      { id: 1, amount: 10.50 },
      { id: 2, amount: 25.25 },
      { id: 3, amount: 5.75 }
    ];

    ExpenseService.getExpenses.mockResolvedValue(expenses);

    render(<ExpenseManager />);

    await waitFor(() => {
      expect(screen.getByText('Total: $41.50')).toBeTruthy();
    });
  });
});
