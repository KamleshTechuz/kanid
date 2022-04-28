const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Address = sequelize.define(
  "address",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pinCode: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Address;
