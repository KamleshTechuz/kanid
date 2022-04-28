const express = require("express");
const router = express.Router();
const sellerContro = require("../controllers/seller");
const prodContro = require("../controllers/product");

const isSeller = require("../middleware/isSeller");
const upload = require("../middleware/isFile");
// Authentication
router.post("/seller/signup", sellerContro.signup);
router.post("/seller/login", sellerContro.login);
router.get("/seller/logout", isSeller, sellerContro.logout);
router.post("/seller/change-password", isSeller, sellerContro.changePass);

// product related

router.post(
  "/seller/add-product",
  isSeller,
  prodContro.addProducts
);
router.get("/seller/my-products?", isSeller, sellerContro.getProducts);
router.get("/seller/my-product/:id", isSeller, prodContro.getProdById);
router.post(
  "/seller/my-product/:id/delete",
  isSeller,
  prodContro.deleteProducts
);
router.post(
  "/seller/my-product/:id/update",
  isSeller,
  prodContro.updateProducts
);

router.get('/seller/my-products?', isSeller, sellerContro.logout)
module.exports = router;
