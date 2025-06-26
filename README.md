# Expensify App Mock

This is a mock repository structure based on Expensify/App, designed specifically for testing the [octocov](https://github.com/k1LoW/octocov) GitHub Actions implementation.

## 🚀 Features

- **React Native Structure**: Mimics the structure of a real React Native app
- **Comprehensive Test Suite**: Includes unit tests, integration tests, and mocks
- **Code Coverage**: Configured with Jest to generate coverage reports
- **GitHub Actions**: Pre-configured octocov workflow for PR coverage comments
- **Modern Testing**: Uses React Native Testing Library for component testing

## 📁 Project Structure

```
├── .github/workflows/
│   └── octocov.yml          # GitHub Actions workflow for code coverage
├── src/
│   ├── components/          # React Native components
│   ├── contexts/            # React contexts (AuthContext)
│   ├── navigation/          # Navigation components
│   ├── services/            # API services and business logic
│   └── utils/               # Utility functions
├── tests/                   # Test files
│   ├── components/          # Component tests
│   ├── services/            # Service tests
│   ├── utils/               # Utility tests
│   └── setup.js            # Jest setup configuration
├── .octocov.yml            # Octocov configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Installation

```bash
npm install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## 📊 Code Coverage

This project is configured with:
- **Jest** for test running and coverage generation
- **octocov** for coverage reporting and PR comments
- **LCOV** format for coverage data
- **70% minimum coverage threshold**

### Coverage Reports

- Coverage reports are generated in the `coverage/` directory
- LCOV format is used for octocov integration
- HTML reports are available for local viewing

## 🤖 GitHub Actions Integration

The repository includes a pre-configured GitHub Actions workflow (`.github/workflows/octocov.yml`) that:

1. Runs on pull requests
2. Installs dependencies
3. Executes tests with coverage
4. Generates coverage reports
5. Posts coverage comments to PRs using octocov

### Workflow Configuration

- **Node.js Version**: 18
- **Test Command**: Matches Expensify/App pattern with timezone and VM modules
- **Coverage Format**: LCOV for octocov compatibility
- **Permissions**: Configured for PR comments and checks

## ⚙️ Configuration

### Jest Configuration

Located in `package.json`, includes:
- React Native preset
- Coverage collection from `src/` directory
- Multiple coverage reporters (LCOV, HTML, JSON, text)
- Test setup file for mocks and utilities

### Octocov Configuration

Located in `.octocov.yml`, includes:
- 70% coverage threshold
- 5% acceptable coverage decrease
- Custom PR comment template
- Artifact storage for main branch

## 🎯 Testing Strategy

### Test Types

1. **Unit Tests**: Individual function and component testing
2. **Integration Tests**: Component interaction testing
3. **Service Tests**: API service and business logic testing
4. **Utility Tests**: Helper function testing

### Mock Strategy

- React Native components mocked for testing
- Navigation libraries mocked
- Alert and platform-specific APIs mocked
- Consistent timer mocking for reliable tests

## 📝 Example Coverage Report

When octocov runs, it will generate PR comments like:

```markdown
## 📊 Code Coverage Report

| Metric | Value |
|--------|-------|
| **Total Coverage** | 85.2% |
| **Diff Coverage** | 92.1% |
| **Acceptable** | 70.0% |

✅ **Coverage meets requirements**

### 📁 Changed Files Coverage
- `src/components/ExpenseManager.js`: 88.5%
- `src/services/ExpenseService.js`: 95.2%
```

## 🔧 Development

### Adding New Components

1. Create component in `src/components/`
2. Add corresponding test in `tests/components/`
3. Import and use in existing components
4. Ensure tests maintain coverage threshold

### Adding New Tests

1. Follow existing naming convention (`*.test.js`)
2. Use React Native Testing Library for component tests
3. Mock external dependencies appropriately
4. Aim for comprehensive coverage of edge cases

## 🤝 Contributing

This is a mock repository for testing purposes. When adapting for real use:

1. Replace mock data with real API integration
2. Add proper form components for expense creation
3. Implement real navigation with React Navigation
4. Add proper error handling and loading states
5. Customize octocov configuration for your needs

## 📄 License

This project is for demonstration purposes only.
