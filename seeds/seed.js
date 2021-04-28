const sequelize = require('../config/connection');
const { User, Post, Comment, Location, Category } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const locationData = require('./locationData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const category = await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  const location = await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });

  const post = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comment = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  

  process.exit(0);
};

seedDatabase();