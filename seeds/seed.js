const sequelize = require('../config/connection');
const { User, Idea, Choice, Vote } = require('../models');

const userData = require('./userData.json');
const ideaData = require('./ideaData.json');
const choiceData = require('./choiceData.json');
const voteData = require('./voteData.json');

console.log(userData);
console.log(ideaData);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Idea.bulkCreate(ideaData, {
    returning: true,
  });

  await Choice.bulkCreate(choiceData, {
    returning: true,
  });

  await Vote.bulkCreate(voteData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
