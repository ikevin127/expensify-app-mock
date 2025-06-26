import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Button, Alert } from 'react-native';

/**
 * AddExpenseModal component for adding new expenses
 * This is a simplified version - in a real app would have form inputs
 */
const AddExpenseModal = ({ visible, onClose, onAddExpense }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddExpense = async () => {
    setIsSubmitting(true);
    try {
      // Mock expense data for demonstration
      const mockExpense = {
        title: 'New Expense',
        amount: Math.floor(Math.random() * 100) + 1,
        category: 'Miscellaneous',
        description: 'Added from modal',
        date: new Date()
      };

      await onAddExpense(mockExpense);
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Add New Expense</Text>
          <Text style={styles.subtitle}>
            This is a mock modal that adds a random expense
          </Text>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={onClose}
              color="#666"
            />
            <Button
              title={isSubmitting ? "Adding..." : "Add Expense"}
              onPress={handleAddExpense}
              disabled={isSubmitting}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default AddExpenseModal;
