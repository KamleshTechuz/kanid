const Color = require('../models/color')
const sequelize = require('../util/db')
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models//product");

exports.addToCart = async (req, res) => {
  // console.log(req.body);
  const { prodId } = req.body;
  console.log(prodId);
  const product = await Product.findOne({ where: { id: prodId } });
  if (!product) {
    return res.json({ error: "Product not available." });
  }
  const existCart = await Cart.findOne({ where: { userId: req.user.id } });
  if (!existCart) {
    const createCart = await Cart.create({
      productId: prodId,
      userId: req.user.id,
      quantity: 1,
    });
    if (createCart) {
      return res.json({ error: "Product added to cart." });
    }
  }
  console.log(product);
  return res.json({ message: "Add to cart" });
};

exports.getMyCart = async (req, res) => {
    const [results, metadata] = await sequelize.query(
        `SELECT * FROM products JOIN carts ON carts.productId = products.id where carts.userId = ${req.user.id}` 
      );
      console.log('results : ', results);
  return res.json({ message: "get cart", myCart : results });
};



exports.getColor = async (req, res) =>{
const colors = await Color.findAll()
    return res.json({colors})
}