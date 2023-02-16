const User = require('./User');
const Idea = require('./Idea');
const Choice = require('./Choice');
const Vote = require('./Vote');

User.hasMany(Idea, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Idea.belongsTo(User, {
  foreignKey: 'user_id',
});

Idea.hasMany(Choice, {
  foreignKey: 'idea_id',
  onDelete: 'CASCADE',
});

Choice.belongsTo(Idea, {
  foreignKey: 'idea_id',
});

User.hasMany(Vote, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Vote.belongsTo(Choice, {
  foreignKey: 'choice_id',
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Idea, Choice, Vote };
