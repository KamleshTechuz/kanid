const express = require("express");
const router = express.Router();
const cartContro = require("../controllers/cart");

const isAuth = require("../middleware/isauth");

router.get("/user/get-my-cart", isAuth, cartContro.getMyCart);
router.post("/user/add-to-cart", isAuth, cartContro.addToCart);

module.exports = router;
