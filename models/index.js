const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

// Import individual models
const User = require('./User');
const Vehicle = require('./Vehicle');

// Defining model associations
User.hasMany(Vehicle, {
  foreignKey: 'user_id', 
});
Vehicle.belongsTo(User, {
  foreignKey: 'user_id',
});

// Export the initialized models
module.exports = {
  User,
  Vehicle,
};
