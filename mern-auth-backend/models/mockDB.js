const bcrypt = require('bcryptjs');

/**
 * Simple in-memory user database
 * For development/testing without MongoDB
 */
class MockDB {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  /**
   * Find user by email
   */
  async findUserByEmail(email) {
    return this.users.find(u => u.email === email.toLowerCase());
  }

  /**
   * Find user by ID
   */
  async findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  /**
   * Create new user
   */
  async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = {
      id: this.nextId++,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    };
    
    this.users.push(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  /**
   * Compare password
   */
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new MockDB();
