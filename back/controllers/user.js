const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");
const Color = require('../models/color')
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
  try {
    if (
      !(
        firstname &&
        lastname &&
        username &&
        email &&
        mobile &&
        password &&
        confirmPass &&
        gender &&
        dateOfBirth &&
        fullAddress
      )
    ) {
      return res.json({ error: "All fields are required." });
    }
    if (password != confirmPass) {
      return res.json({ error: "Password does not match." });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const createdUser = await User.create({
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
    console.log(createdUser);
    createdUser.createAddress({
      place,
      city,
      state,
      pinCode,
    });
    if (createdUser) {
      return res.json({ message: "sign up successfully" });
    }
  } catch (error) {
    return res.json({ error: "Something happend wrong" });
  }
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
    console.log(email);
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.json({ error: "Invalid Credentials" });
    }
    const hashedPass = await bcrypt.compare(password, user.password);
    if (user && hashedPass) {
      // Create token
      console.log(user, hashedPass);
      const token = jwt.sign({ name: user.name, email: user.email }, "techuz", {
        expiresIn: "2h",
      });
      const userId = user.dataValues.slug;
      const record = await User.update({ token }, { where: { email } });
      // save user token
      user.token = token;

      // user
      return res.status(200).json({ user, status: true });
    } else {
      return res.json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    const loggedOut = await User.update(
      { token: null },
      { where: { token: req.user.token } }
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
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    // console.log(user);
    if (!user) {
      return res.json({ error: "User does not exist." });
    }
    const hashedOldPass = await bcrypt.compare(oldPass, user.password);
    console.log(hashedOldPass);
    if (hashedOldPass) {
      if (newPass === confirmPass) {
        const newHashedPass = await bcrypt.hash(newPass, 12);
        console.log(newHashedPass);
        user.password = newHashedPass;
        const updatedUser = user.save();
        if (updatedUser) {
          return res.json({ message: "Password changed successfully." });
        }
        return res.json({ error: "something happend wrong." });
      }
      return res.json({ error: "Password does not match." });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Incorrect password." });
  }
};
exports.addColor = async (req, res) => {
  console.log(req.body);
  await Color.create({colorName : req.body.colorName})
  return res.json({message : "color addition"})
};
