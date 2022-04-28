const Sequelize = require('sequelize');

const sequelize = require('../util/db')

const ProductColor = sequelize.define('product_color', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
},
{
    timestamps: false
}
);

module.exports = ProductColor;