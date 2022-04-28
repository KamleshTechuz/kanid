const Seller = require("../models/seller");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

  console.log('token : ', req.get('Authorization'));
  const token =
    req.body.token || req.query.token || req.get("Authorization");
// console.log('token : ',token);
  if (!token) {
    return res.json({error : "Authentication // required"});
  }
  try {
    const decoded = jwt.verify(token, "techuz");
    // console.log(decoded);
    const seller = await Seller.findOne({ where : {email: decoded.email}});
    // console.log(seller);
    // console.log(token);
    if (seller && seller.token === token) {
        console.log('true');
      req.seller = seller
      next();
    } else {
        console.log('seller');
      return res.json({error : "Authentication ---- required"});
    }
  } catch (err) {
    return res.json({error : "Authentication required"});
  }
  // return next();
};

module.exports = verifyToken;
