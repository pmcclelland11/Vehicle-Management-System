const sequelize = require("./config/connection");
const { Vehicle } = require("./models");
const vehicleData = require("./vehicleData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    await Vehicle.bulkCreate(vehicleData);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }

  process.exit(0);
};

seedDatabase();