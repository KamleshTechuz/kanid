const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require('path')
const sequelize = require("./util/db");

app.use(bodyParser.json());
app.use("/image", express.static(path.join(__dirname, "image")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const userRoute = require("./routes/user");
const prodRoute = require("./routes/products");
const sellerRoute = require("./routes/seller");

const cartRoute = require("./routes/cart");

app.use("/api", userRoute);
app.use("/api", prodRoute);
app.use("/api", sellerRoute);
app.use("/api", cartRoute);

const User = require("./models/user");
const Address = require("./models/address");
const Seller = require("./models/seller");
const Product = require("./models/product");
const Cart = require("./models/cart");

const Color = require('./models/color')
const ProductColor = require('./models/productColor')


User.hasMany(Address, {
  constraints: true,
  onDelete: "CASCADE",
});
Cart.belongsTo(Product, { foreignKey: "productId" });
Cart.belongsTo(User, { foreignKey: "userId" });
Seller.hasMany(Address, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Cart, {
  constraints: true,
  onDelete: "CASCADE",
});
Product.hasMany(Cart, {
  constraints: true,
  onDelete: "CASCADE",
});
Seller.hasMany(Product, {
  constraints: true,
  onDelete: "CASCADE",
});
Address.belongsTo(User);

Color.belongsToMany(Product, { through: ProductColor, onDelete: "CASCADE" });
Product.belongsToMany(Color, { through: ProductColor, onDelete: "CASCADE" });

sequelize
  // .sync({force  :true})
  .sync()

  .then(() => {
    app.listen(3000);
  });
