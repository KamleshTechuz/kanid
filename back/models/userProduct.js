const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const userProduct = sequelize.define(
  "userproduct",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    brandName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userProduct;
