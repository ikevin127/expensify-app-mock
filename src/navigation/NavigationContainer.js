import React from 'react';
import { View } from 'react-native';

/**
 * Simple navigation container mock
 * In a real app, this would be the React Navigation container
 */
const NavigationContainer = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};

export default NavigationContainer;
