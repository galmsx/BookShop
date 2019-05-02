var User = require("../../models").User;
var jwt = require("jsonwebtoken");
var secret = require("../../config/config.json").secret;
module.exports = (req, res) => {
  var login = req.query.login;
  var password = req.query.password;

  User.create({
    login,
    password
  })
    .then(({ dataValues }) => {
      var payload = {
        id: dataValues.id,
        login: dataValues.login,
        isAdmin: dataValues.isAdmin
      };
      res.send(jwt.sign(payload, secret, { expiresIn: "7d" }));
    })
    .catch(err => {
      if (err.parent.code == "ER_DUP_ENTRY") {
        res.status(501).send("not unique login");
      } else {
        res.status(500).send(err);
      }
    });
};
