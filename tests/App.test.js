import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { Text, Button, ActivityIndicator } from 'react-native';
import '@testing-library/jest-native/extend-expect';
import App from '../src/App';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

/**
 * Mock Component to test app integration with authentication context
 */
const TestComponent = () => {
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  return (
    <>
      <Text testID="user">{user ? user.name : 'No User'}</Text>
      <Text testID="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Text>
      {isLoading ? <ActivityIndicator testID="loading-indicator" /> : null}
      <Button
        testID="login-button"
        title="Login"
        onPress={() => login('test@example.com', 'password')}
      />
      <Button
        testID="logout-button"
        title="Logout"
        onPress={() => logout()}
      />
    </>
  );
};

/**
 * Integration tests for the main app
 */
describe('App Integration', () => {
  it('renders the main app without crashing', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.queryByText('Expensify App Mock')).toBeTruthy();
  });

  it('handles user login and logout correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(screen.getByTestId('login-button'));
    await waitFor(() => expect(screen.queryByTestId('user')).toHaveTextContent('Test User'));
    expect(screen.queryByTestId('auth-status')).toHaveTextContent('Authenticated');

    fireEvent.press(screen.getByTestId('logout-button'));
    await waitFor(() => expect(screen.queryByTestId('user')).toHaveTextContent('No User'));
    expect(screen.queryByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });
});

