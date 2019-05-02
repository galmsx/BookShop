var secret = require("../config/config.json").secret;
var jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  var token = req.get("authorization");
  try {
    req.token = jwt.verify(token, secret);
  } catch (err) {
    req.token = null;
  }

  next();
};
