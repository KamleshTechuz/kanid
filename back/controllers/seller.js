const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const Color = require("../models/color");
exports.signup = async (req, res) => {
  console.log(req.body);
  const {
    firstname,
    lastname,
    username,
    email,
    mobile,
    password,
    confirmPass,
    gender,
    dateOfBirth,
    fullAddress,
  } = req.body;
  const hashedPass = await bcrypt.hash(password, 12);
  const createdSeller = await Seller.create({
    firstname,
    lastname,
    username,
    email,
    mobile,
    password: hashedPass,
    gender,
    dateOfBirth,
  });
  const { place, city, state, pinCode } = fullAddress;
  console.log(createdSeller);
  createdSeller.createAddress({
    place,
    city,
    state,
    pinCode,
  });
  if (createdSeller) {
    return res.json({ message: "sign up successfully" });
  }
  console.log(req.body);

  return res.json({ message: "sign up page" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Get user input

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    // console.log(email);
    const seller = await Seller.findOne({ where: { email } });
    // console.log(seller);
    if (!seller) {
      return res.json({ error: "Invalid Credentials" });
    }
    const hashedPass = await bcrypt.compare(password, seller.password);
    if (seller && hashedPass) {
      // Create token
      //   console.log(seller, hashedPass);
      const token = jwt.sign(
        { name: seller.name, email: seller.email },
        "techuz",
        {
          expiresIn: "2h",
        }
      );
      const record = await Seller.update({ token }, { where: { email } });
      if (!record) {
        return res.json({ error: "token not setted." });
      }
      //   console.log(seller.token);
      return res.status(200).json({ token, status: true });
    } else {
      return res.json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    const loggedOut = await Seller.update(
      { token: null },
      { where: { token: req.user.token } }
    );
    if (loggedOut) {
      return res.json({ message: "logged out" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "error is here" });
  }
};
exports.logout = async (req, res) => {
  try {
    const loggedOut = await Seller.update(
      { token: null },
      { where: { token: req.seller.token } }
    );
    if (loggedOut) {
      return res.json({ message: "logged out successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "error is here" });
  }
};

exports.changePass = async (req, res) => {
  const { oldPass, newPass, confirmPass } = req.body;
  const seller = await Seller.findOne({ where: { id: req.seller.id } });
  console.log(seller);
  if (!seller) {
    return res.json({ error: "User does not exist." });
  }
  const hashedOldPass = await bcrypt.compare(oldPass, seller.password);
  console.log(hashedOldPass);
  if (hashedOldPass) {
    if (newPass === confirmPass) {
      const newHashedPass = await bcrypt.hash(newPass, 12);
      console.log(newHashedPass);
      seller.password = newHashedPass;
      const updatedUser = seller.save();
      if (updatedUser) {
        return res.json({ message: "Password changed successfully." });
      }
      return res.json({ error: "something happend wrong." });
    }
    return res.json({ error: "Password does not match." });
  }
  return res.json({ error: "Incorrect password." });
};

exports.getProducts = async (req, res) => {
  const currPage = req.query.page || 1;
  console.log(currPage);
  const perPage = 2;
  try {
    const products = await Product.findAndCountAll({
      where: { sellerId: req.seller.id },
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
    if (products) {
      return res.status(200).json({
        message: "Product fetched",
        products: products.rows,
        totalProds : products.count,
      });
    } else {
      return res.status(200).json({ error: "Products not available." });
    }
  } catch (error) {
    return res.status(200).json({ error: "Something happend wrong." });
  }
};
