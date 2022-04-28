const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Color = sequelize.define(
  "color",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    colorName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Color;
