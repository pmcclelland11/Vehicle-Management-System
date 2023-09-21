const { Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

// Import individual models
const User = require('./User');
const Vehicle = require('./Vehicle');

// Initialize models and define associations
User.init(sequelize);
Vehicle.init(sequelize);

// Define model associations here (if any)
User.hasMany(Vehicle, {
  foreignKey: 'user_id', // You may need to adjust the foreign key based on your database schema
});
Vehicle.belongsTo(User, {
  foreignKey: 'user_id', // You may need to adjust the foreign key based on your database schema
});

// Export the initialized models
module.exports = {
  User,
  Vehicle,
};
