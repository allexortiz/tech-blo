// Importing necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Importing bcrypt for password hashing
const bcrypt = require('bcrypt');
// Importing the database connection (sequelize)
const sequelize = require('../config/connection');

// Defining the User model by extending Sequelize's Model class
class User extends Model {
  // Method to check the provided password against the hashed password in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializing the User model with specified attributes and configurations
User.init(
  {
    // User ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // User username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // User email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // User password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Sequelize configurations
    hooks: {
      // Before creating a new user, hash the provided password
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // Before updating a user, hash the provided password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false, // Disabling automatic timestamp fields
    freezeTableName: true, // Preventing table name pluralization
    underscored: true, // Using snake_case for column names
    modelName: 'user', // Model name in singular form
  }
);

// Exporting the User model for use in other parts of the application
module.exports = User;