import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { ExpenseService } from '../services/ExpenseService';
import { formatCurrency } from '../utils/formatters';
import ExpenseItem from './ExpenseItem';
import AddExpenseModal from './AddExpenseModal';

/**
 * ExpenseManager component handles expense list management
 * Provides functionality to add, view, and delete expenses
 */
const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  }, [expenses]);

  const loadExpenses = async () => {
    try {
      setIsLoading(true);
      const data = await ExpenseService.getExpenses();
      setExpenses(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
      console.error('Error loading expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await ExpenseService.createExpense(expenseData);
      setExpenses(prev => [...prev, newExpense]);
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await ExpenseService.deleteExpense(expenseId);
      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete expense');
      console.error('Error deleting expense:', error);
    }
  };

  const handleDeleteExpense = (expenseId) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteExpense(expenseId) }
      ]
    );
  };

  // New uncovered functionality - filtering by category
  const filterExpensesByCategory = (category) => {
    if (category === 'All') {
      return expenses;
    }
    return expenses.filter(expense => expense.category === category);
  };

  // New uncovered functionality - sorting expenses
  const sortExpenses = (expenseList, order) => {
    const sorted = [...expenseList];
    if (order === 'newest') {
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === 'oldest') {
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (order === 'highest') {
      return sorted.sort((a, b) => b.amount - a.amount);
    } else if (order === 'lowest') {
      return sorted.sort((a, b) => a.amount - b.amount);
    }
    return sorted;
  };

  const renderExpenseItem = ({ item }) => (
    <ExpenseItem
      expense={item}
      onDelete={() => handleDeleteExpense(item.id)}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading expenses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expense Manager</Text>
        <Text style={styles.total}>Total: {formatCurrency(totalAmount)}</Text>
        <Button
          title="Add Expense"
          onPress={() => setIsModalVisible(true)}
          testID="add-expense-button"
        />
      </View>

      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        testID="expense-list"
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet. Add your first expense!</Text>
        }
      />

      <AddExpenseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddExpense={addExpense}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});

export default ExpenseManager;
