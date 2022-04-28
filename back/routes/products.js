const express = require("express");
const router = express.Router();
const prodContro = require('../controllers/product')
const cartContro = require("../controllers/cart");

const isSeller = require('../middleware/isSeller')

router.get("/all-products?", prodContro.getProducts);
router.get("/all-products/search?", prodContro.search);
router.get("/user/color",isSeller, cartContro.getColor);


module.exports = router;
