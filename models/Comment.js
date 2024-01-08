const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

// Comment model definition
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [3]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
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

// Associate Comment with User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // or 'SET NULL' depending on your use case
});

// Associate Comment with Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE', // or 'SET NULL' depending on your use case
});

module.exports = Comment;