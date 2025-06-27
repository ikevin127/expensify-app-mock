// ExpenseService.test.js
// Unit tests for ExpenseService covering all methods and edge cases

import { ExpenseService } from '../../src/services/ExpenseService';

describe('ExpenseService', () => {
  beforeEach(() => {
    ExpenseService.resetMockData();
  });

  it('should fetch all expenses', async () => {
    const expenses = await ExpenseService.getExpenses();
    expect(Array.isArray(expenses)).toBe(true);
    expect(expenses.length).toBeGreaterThan(0);
  });

  it('should create a new expense', async () => {
    const expenseData = {
      title: 'Test Expense',
      amount: 20,
      category: 'Test',
      date: new Date('2023-12-10'),
      description: 'Test desc'
    };
    const newExpense = await ExpenseService.createExpense(expenseData);
    expect(newExpense).toMatchObject(expenseData);
    const all = await ExpenseService.getExpenses();
    expect(all.find(e => e.id === newExpense.id)).toBeTruthy();
  });

  it('should update an existing expense', async () => {
    const [first] = await ExpenseService.getExpenses();
    const updated = await ExpenseService.updateExpense(first.id, { amount: 99.99, title: 'Updated' });
    expect(updated.amount).toBe(99.99);
    expect(updated.title).toBe('Updated');
  });

  it('should throw when updating non-existent expense', async () => {
    await expect(ExpenseService.updateExpense(999999, { amount: 1 })).rejects.toThrow('Expense not found');
  });

  it('should delete an expense', async () => {
    const [first] = await ExpenseService.getExpenses();
    const result = await ExpenseService.deleteExpense(first.id);
    expect(result).toBe(true);
    const all = await ExpenseService.getExpenses();
    expect(all.find(e => e.id === first.id)).toBeFalsy();
  });

  it('should throw when deleting non-existent expense', async () => {
    await expect(ExpenseService.deleteExpense(999999)).rejects.toThrow('Expense not found');
  });

  it('should get expenses by category (case-insensitive)', async () => {
    const food = await ExpenseService.getExpensesByCategory('food & drink');
    expect(food.length).toBeGreaterThan(0);
    food.forEach(e => expect(e.category.toLowerCase()).toBe('food & drink'));
  });

  it('should get expenses by date range', async () => {
    const start = new Date('2023-12-01');
    const end = new Date('2023-12-02');
    const range = await ExpenseService.getExpensesByDateRange(start, end);
    expect(range.length).toBeGreaterThan(0);
    range.forEach(e => {
      expect(e.date >= start && e.date <= end).toBe(true);
    });
  });

  it('should get expense stats', async () => {
    const stats = await ExpenseService.getExpenseStats();
    expect(stats.totalExpenses).toBeGreaterThan(0);
    expect(stats.totalAmount).toBeGreaterThan(0);
    expect(stats.averageAmount).toBeGreaterThan(0);
    expect(stats.categories).toBeInstanceOf(Object);
  });

  it('should reset mock data', async () => {
    await ExpenseService.createExpense({
      title: 'To be removed',
      amount: 1,
      category: 'Test',
      date: new Date(),
      description: 'desc'
    });
    ExpenseService.resetMockData();
    const all = await ExpenseService.getExpenses();
    expect(all.length).toBe(3);
  });

  it('should delay for at least the specified ms', async () => {
    const start = Date.now();
    await ExpenseService.delay(100);
    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
  });
});
