import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExpenseManager from './components/ExpenseManager';
import AuthProvider from './contexts/AuthContext';
import NavigationContainer from './navigation/NavigationContainer';

/**
 * Main application component
 * Handles the overall app structure and provides global context
 */
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Text style={styles.title}>Expensify App Mock</Text>
          <ExpenseManager />
        </View>
      </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
