// AddExpenseModal.test.js
// Unit tests for AddExpenseModal component
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddExpenseModal from '../../src/components/AddExpenseModal';
import { Alert } from 'react-native';

// Mock Modal to render children inline for test environment
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const React = require('react');
  return ({ children }) => <>{children}</>;
});

describe('AddExpenseModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when visible', () => {
    const { getByText } = render(
      <AddExpenseModal visible={true} onClose={jest.fn()} onAddExpense={jest.fn()} />
    );
    expect(getByText('Add New Expense')).toBeTruthy();
    expect(getByText('This is a mock modal that adds a random expense')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Add Expense')).toBeTruthy();
  });

  it('does not render modal when not visible', () => {
    const { queryByText } = render(
      <AddExpenseModal visible={false} onClose={jest.fn()} onAddExpense={jest.fn()} />
    );
    expect(queryByText('Add New Expense')).toBeNull();
  });

  it('calls onClose when Cancel is pressed', () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <AddExpenseModal visible={true} onClose={onClose} onAddExpense={jest.fn()} />
    );
    fireEvent.press(getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});
