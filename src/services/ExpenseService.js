/**
 * ExpenseService handles all expense-related API operations
 * This is a mock service that simulates real API calls
 */
export class ExpenseService {
  static mockExpenses = [
    {
      id: 1,
      title: 'Coffee',
      amount: 4.50,
      category: 'Food & Drink',
      date: new Date('2023-12-01'),
      description: 'Morning coffee at Starbucks'
    },
    {
      id: 2,
      title: 'Uber Ride',
      amount: 12.75,
      category: 'Transportation',
      date: new Date('2023-12-02'),
      description: 'Ride to the office'
    },
    {
      id: 3,
      title: 'Lunch',
      amount: 15.99,
      category: 'Food & Drink',
      date: new Date('2023-12-02'),
      description: 'Business lunch meeting'
    }
  ];

  /**
   * Fetch all expenses
   * @returns {Promise<Array>} Array of expense objects
   */
  static async getExpenses() {
    // Simulate API delay
    await this.delay(500);
    return [...this.mockExpenses];
  }

  /**
   * Create a new expense
   * @param {Object} expenseData - The expense data to create
   * @returns {Promise<Object>} The created expense object
   */
  static async createExpense(expenseData) {
    await this.delay(300);
    
    const newExpense = {
      id: Date.now(), // Simple ID generation
      ...expenseData,
      date: new Date(expenseData.date || Date.now())
    };

    this.mockExpenses.push(newExpense);
    return newExpense;
  }

  /**
   * Update an existing expense
   * @param {number} id - The expense ID
   * @param {Object} updateData - The data to update
   * @returns {Promise<Object>} The updated expense object
   */
  static async updateExpense(id, updateData) {
    await this.delay(300);
    
    const index = this.mockExpenses.findIndex(expense => expense.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }

    this.mockExpenses[index] = {
      ...this.mockExpenses[index],
      ...updateData,
      date: new Date(updateData.date || this.mockExpenses[index].date)
    };

    return this.mockExpenses[index];
  }

  /**
   * Delete an expense
   * @param {number} id - The expense ID to delete
   * @returns {Promise<boolean>} Success status
   */
  static async deleteExpense(id) {
    await this.delay(200);
    
    const index = this.mockExpenses.findIndex(expense => expense.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }

    this.mockExpenses.splice(index, 1);
    return true;
  }

  /**
   * Get expenses by category
   * @param {string} category - The category to filter by
   * @returns {Promise<Array>} Array of filtered expenses
   */
  static async getExpensesByCategory(category) {
    await this.delay(400);
    return this.mockExpenses.filter(expense => 
      expense.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get expenses within a date range
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Promise<Array>} Array of filtered expenses
   */
  static async getExpensesByDateRange(startDate, endDate) {
    await this.delay(400);
    return this.mockExpenses.filter(expense => 
      expense.date >= startDate && expense.date <= endDate
    );
  }

  /**
   * Get expense statistics
   * @returns {Promise<Object>} Statistics object
   */
  static async getExpenseStats() {
    await this.delay(600);
    
    const total = this.mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const categories = {};
    
    this.mockExpenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = { count: 0, total: 0 };
      }
      categories[expense.category].count++;
      categories[expense.category].total += expense.amount;
    });

    return {
      totalExpenses: this.mockExpenses.length,
      totalAmount: total,
      averageAmount: total / this.mockExpenses.length || 0,
      categories
    };
  }

  /**
   * Utility method to simulate API delay
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise}
   */
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Reset mock data (useful for testing)
   */
  static resetMockData() {
    this.mockExpenses = [
      {
        id: 1,
        title: 'Coffee',
        amount: 4.50,
        category: 'Food & Drink',
        date: new Date('2023-12-01'),
        description: 'Morning coffee at Starbucks'
      },
      {
        id: 2,
        title: 'Uber Ride',
        amount: 12.75,
        category: 'Transportation',
        date: new Date('2023-12-02'),
        description: 'Ride to the office'
      },
      {
        id: 3,
        title: 'Lunch',
        amount: 15.99,
        category: 'Food & Drink',
        date: new Date('2023-12-02'),
        description: 'Business lunch meeting'
      }
    ];
  }
}
