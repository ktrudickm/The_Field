const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Location = require('./Location');
const Category = require('./Category');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Location.hasMany(Post, {
  foreignKey: 'location_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Category.hasMany(Post, {
  foreignKey: 'category_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment, Location, Category };
