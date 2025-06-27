// ExpenseItem.test.js
// Unit tests for ExpenseItem component
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExpenseItem from '../../src/components/ExpenseItem';

describe('ExpenseItem', () => {
  const expense = {
    id: 1,
    title: 'Coffee',
    amount: 4.5,
    category: 'Food & Drink',
    date: new Date('2023-12-01'),
    description: 'Morning coffee'
  };

  it('renders all expense fields', () => {
    const { getByText } = render(<ExpenseItem expense={expense} onDelete={jest.fn()} />);
    expect(getByText('Coffee')).toBeTruthy();
    expect(getByText('Food & Drink')).toBeTruthy();
    expect(getByText('Morning coffee')).toBeTruthy();
    expect(getByText('Dec 1, 2023')).toBeTruthy();
    expect(getByText('$4.50')).toBeTruthy();
    expect(getByText('Delete')).toBeTruthy();
  });

  it('calls onDelete when delete button is pressed', () => {
    const onDelete = jest.fn();
    const { getByText } = render(<ExpenseItem expense={expense} onDelete={onDelete} />);
    fireEvent.press(getByText('Delete'));
    expect(onDelete).toHaveBeenCalled();
  });
});
