const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Comment model definition
class Comment extends Model {}

Comment.init(
  {
    // Comment ID (auto-incrementing integer)
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Comment text (string with a minimum length of 3 characters)
    comment_text: {
      type: DataTypes.STRING,
      validate: {
        len: [3]
      }
    },
    // User ID associated with the comment (foreign key referencing user table)
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // Post ID associated with the comment (foreign key referencing post table)
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;