import '@testing-library/jest-native/extend-expect';

// Mock React Native TurboModule Registry
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  return {
    getEnforcing: jest.fn(() => ({
      getConstants: jest.fn(() => ({})),
    })),
    get: jest.fn(() => ({
      getConstants: jest.fn(() => ({})),
    })),
  };
});

// Mock NativeDeviceInfo
jest.mock('react-native/Libraries/Utilities/NativeDeviceInfo', () => ({
  getConstants: () => ({
    Dimensions: {
      windowPhysicalPixels: {
        width: 375,
        height: 667,
        scale: 2,
        fontScale: 1,
      },
      screenPhysicalPixels: {
        width: 375,
        height: 667,
        scale: 2,
        fontScale: 1,
      },
    },
  }),
}));

// Mock React Native Settings
jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}));

// Mock React Native components
jest.mock('react-native', () => {
  const React = require('react');
  const ReactNative = jest.requireActual('react-native');
  
  // Mock FlatList to handle data prop validation properly
  const FlatList = React.forwardRef((props, ref) => {
    const { data = [], renderItem, keyExtractor, ListEmptyComponent, ...otherProps } = props;
    
    if (data.length === 0 && ListEmptyComponent) {
      return React.createElement('View', otherProps, 
        typeof ListEmptyComponent === 'function' 
          ? React.createElement(ListEmptyComponent) 
          : ListEmptyComponent
      );
    }
    
    return React.createElement('ScrollView', otherProps,
      data.map((item, index) => {
        const key = keyExtractor ? keyExtractor(item, index) : String(index);
        return React.createElement('View', { key }, renderItem({ item, index }));
      })
    );
  });
  
  return {
    ...ReactNative,
    FlatList,
    Alert: {
      alert: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});


// Global test configuration
global.console = {
  ...console,
  // Uncomment to silence console logs during tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Test cleanup
afterEach(() => {
  jest.clearAllMocks();
});
