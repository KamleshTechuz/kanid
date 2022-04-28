const Sequelize = require("sequelize");

const sequelize = require("../util/db");

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    // productId: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // userId: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Cart;
