import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatCurrency, formatDate } from '../utils/formatters';

/**
 * ExpenseItem component displays a single expense
 */
const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.date}>{formatDate(expense.date)}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default ExpenseItem;
