const User = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

//   console.log('token : ', req.get('Authorization'));
  const token =
    req.body.token || req.query.token || req.get("Authorization");
console.log('token : ', token);
  if (!token) {
    return res.status(403).send("Authentication // required");
  }
  try {
    const decoded = jwt.verify(token, "techuz");
    console.log(decoded);
    const user = await User.findOne({where :  {email: decoded.email}});
    console.log(user);
    if (user && user.token === token) {
      console.log('user accessed');
      req.user = user

      next();
    } else {
      return res.status(401).send("Authentication ---- required");
    }
  } catch (err) {
    console.log('user');
    return res.status(401).send("Authentication required");
  }
  // return next();
};

module.exports = verifyToken;
