// Importing necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Importing the database connection (sequelize)
const sequelize = require('../config/connection');
// Defining the Post model by extending Sequelize's Model class
class Post extends Model {}

// Initializing the Post model with specified attributes and configurations
Post.init(
  {
    // Post ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Post title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Post description column
    description: {
      type: DataTypes.STRING,
    },
    // Post creation date column
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // User ID column as a foreign key referencing the User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    // Sequelize configurations
    sequelize,
    timestamps: false, // Disabling automatic timestamp fields
    freezeTableName: true, // Preventing table name pluralization
    underscored: true, // Using snake_case for column names
    modelName: 'post', // Model name in singular form
  }
);

// Exporting the Post model for use in other parts of the application
module.exports = Post;