const fs = require("fs");
const Product = require("../models/product");
const Seller = require("../models/seller");
const sequelize = require("sequelize");
const ProductColor = require("../models/productColor");
const bcrypt = require("bcrypt");
const Color = require("../models/color");
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
      products: products.rows,
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
    description,
    password,
    confirmPass,
    colors,
  } = req.body;
  console.log(req.body);
  const arrayColor = colors.split(',')

  const image = req.file;
  const imageUrl = image.path;
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
    if (!image) {
      return res.json({ error: "Image can not uploaded." });
    }
    const seller = await Seller.findOne({ where: { token: req.seller.token } });
    const checkPass = await bcrypt.compare(password, seller.password);

    if (!(checkPass && password == confirmPass)) {
      fs.unlinkSync(deletedProd.imageUrl);

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
    console.log(colors);
    const createdColor = await product.addColors(arrayColor, {
      through: ProductColor,
    });

    if (product) {
      return res.json({ message: "products added successfully." });
    }
  } catch (error) {
    console.log(error);
    fs.unlinkSync(imageUrl);
    return res.json({ error: "Something happend wrong." });
  }
};

exports.deleteProducts = async (req, res) => {
  console.log(req.body);
  const { prodId } = req.body;
  try {
    const fetchedProd = await Product.findOne({ where: { id: prodId } });
    const deletedProd = await Product.destroy({ where: { id: prodId } });
    if (deletedProd) {
      fs.unlinkSync(fetchedProd.imageUrl);
      return res.json({ message: "product deleted successfully." });
    }
    return res.json({ error: "product can not be deleted." });
  } catch (error) {
    return res.json({ error: "Something happend wrong." });
  }
};

exports.getProdById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findByPk(id);
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
    description,
    password,
    confirmPass,
    colors,
  } = req.body;
  const { id } = req.params;

  console.log(req.body);
  console.log(req.file);
  let imageUrl;

  try {
    if (
      !(
        productName &&
        brandName &&
        price &&
        category &&
        description &&
        password &&
        confirmPass
      )
    ) {
      return res.json({ error: "All fields are requrired." });
    }
    const seller = await Seller.findOne({ where: { token: req.seller.token } });
    const checkPass = await bcrypt.compare(password, seller.password);
    if (!(checkPass && password == confirmPass)) {
      return res.json({ error: "Incorrect password." });
    }
    const product = await Product.findOne({ where: { id } });
    if (req.file) {
      const image = req.file;
      imageUrl = image.path;
      console.log(product);
      fs.unlinkSync(product.imageUrl);
    } else {
      imageUrl = product.imageUrl;
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
      const arrayColor = colors.split(',')
      console.log(colors);
      const colorProd = await Product.findOne({ where: { id } });
      const existingColor = await colorProd.getColors();
      colorProd.removeColor(existingColor);

      // await colorProd.removeColor();
      await colorProd.addColor(arrayColor, { through: ProductColor });
    }
    return res.json({ message: "Product updated successfully." });
  } catch (error) {
    console.log(error);
    fs.unlinkSync(imageUrl);

    return res.json({ error: "Something happend wrong." });
  }
};
