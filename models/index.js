// Importing User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Defining associations between User, Post, and Comment models

// User has many Posts (one-to-many relationship)
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Post belongs to a User (one-to-one relationship with onDelete CASCADE)
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

// Comment belongs to a User (one-to-one relationship with onDelete CASCADE)
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

// Comment belongs to a Post (one-to-one relationship with onDelete CASCADE)
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});

// User has many Comments (one-to-many relationship with onDelete CASCADE)
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Post has many Comments (one-to-many relationship with onDelete CASCADE)
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Exporting User, Post, and Comment models
module.exports = { User, Post, Comment };