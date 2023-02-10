const User = require('./User');
const Idea = require('./Idea');
const Choice = require('./Choice');

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

module.exports = { User, Idea, Choice };
