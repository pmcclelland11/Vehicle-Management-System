// const sequelize = require("../config/connection");
// const { Vehicle } = require("../models");
// const vehicleData = require("./vehicleData.json");

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   try {
//     await Vehicle.bulkCreate(vehicleData);
//     console.log("Database seeded successfully!");
//   } catch (err) {
//     console.error("Error seeding database:", err);
//   }

//   process.exit(0);
// };

// seedDatabase();


const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = [
  {
    name: "Manager User",
    email: "manager@example.com",
    password: "Manager123",
    role: "manager",
  },
  {
    name: "Employee User",
    email: "employee@example.com",
    password: "Employee456",
    role: "employee",
  },
];

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    user.password = await bcrypt.hash(user.password, 10);
    await User.create(user);
  }

  process.exit(0);
};

seedUsers();