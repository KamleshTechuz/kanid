const Product = require("../models/product");
const Seller = require("../models/seller");
const sequelize = require("sequelize");
const ProductColor = require("../models/productColor");
const bcrypt = require("bcrypt");
const Color = require('../models/color') 
exports.getProducts = async (req, res) => {
  const currPage = req.query.page || 1;
  console.log(currPage);
  const perPage = 2;
  totalProds = await Product.count();
  if (totalProds) {
      // const products = await Product.findAll({
      //   offset: (currPage - 1) * perPage,
      //   limit: 2,
      // });
    const products = await Product.findAndCountAll({
      offset: (currPage - 1) * perPage,
      limit: 2,
      required: false,
      attributes: {
        exclude: ["createdAt", "updatedAt", "OwnerId"],
      },
      include: [
        {
          model: Color,
          attributes: ["colorName"],
          through: { attributes: [] },
        },
      ],
      distinct: true,
    });
    console.log(products.rows);
    return res.json({
      message: "Product fetched",
      products : products.rows,
      totalProds,
    });
  } else {
    return res.json({ error: "Products not available." });
  }
};

exports.search = async (req, res) => {
  console.log("hello");
  const { productName } = req.query;
  console.log(productName);
  const products = await Product.findAll({
    where: { productName: { [sequelize.Op.regexp]: `${productName}` } },
  });
  if (products) {
    return res.json({ message: "Product found successfully.", products });
  }
  return res.json({ error: "Product not found." });
};

exports.addProducts = async (req, res) => {
  const {
    productName,
    brandName,
    price,
    category,
    imageUrl,
    description,
    password,
    confirmPass,
    colors,
  } = req.body;
  try {
    if (
      !(
        productName &&
        brandName &&
        price &&
        category &&
        imageUrl &&
        description &&
        password &&
        confirmPass &&
        colors
      )
    ) {
      return res.json({ error: "All fields are requrired." });
    }
    const seller = await Seller.findOne({ where: { token: req.seller.token } });
    const checkPass = await bcrypt.compare(password, seller.password);

    if (!(checkPass && password == confirmPass)) {
      return res.json({ error: "Incorrect password." });
    }

    const product = await seller.createProduct({
      productName,
      brandName,
      price,
      imageUrl,
      category,
      description,
    });
    const createdColor = await product.addColor(colors, {
      through: ProductColor,
    });
    if (product) {
      return res.json({ message: "products added successfully." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something happend wrong." });
  }
};

exports.deleteProducts = async (req, res) => {
  console.log(req.body);
  const { prodId } = req.body;
  const deletedProd = await Product.destroy({ where: { id: prodId } });
  if (deletedProd) {
    return res.json({ message: "product deleted successfully." });
  }
  return res.json({ error: "product cannnot be deleted." });
};

exports.getProdById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findByPk(id);
  console.log(product);
  if (!product) {
    return res.json({ error: "Product does not exist." });
  }
  return res.json({ message: "by id products.", product });
};

exports.updateProducts = async (req, res) => {
  const {
    productName,
    brandName,
    price,
    category,
    imageUrl,
    description,
    password,
    confirmPass,
    colors,
  } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    if (
      !(
        productName &&
        brandName &&
        price &&
        imageUrl &&
        category &&
        description &&
        password &&
        confirmPass &&
        colors
      )
    ) {
      return res.json({ error: "All fields are requrired." });
    }
    const seller = await Seller.findOne({ where: { token: req.seller.token } });
    const checkPass = await bcrypt.compare(password, seller.password);
    if (!(checkPass && password == confirmPass)) {
      return res.json({ error: "Incorrect password." });
    }
    const updateProd = await Product.update(
      {
        productName,
        brandName,
        price,
        imageUrl,
        category,
        description,
      },
      { where: { id } }
    );
    if (colors) {
      console.log(colors);
      const colorProd = await Product.findOne({ where: { id } });
      const existingColor = await colorProd.getColors();
      colorProd.removeColor(existingColor);

      // await colorProd.removeColor();
      await colorProd.addColor(colors, { through: ProductColor });
    }
    return res.json({ message: "Product updated successfully." });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something happend wrong." });
  }
};
